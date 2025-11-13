/**
 * Users Controller
 *
 * Handles user profile management actions.
 *
 */

// TYPES IMPORTS
import type { UserType } from "@my/shared/types/user.js";
// NPM IMPORTS
import { Request, Response, NextFunction } from "express";
import debug from "debug";
// LOCAL IMPORTS
import ApiError from "../utilities/ApiError.util.js";
import authUtil from "../utilities/auth.util.js";
import { findOneUserById, updateUser } from "../services/users.service.js";

// Debug logger for users-related actions
const usersDebug = debug("app:users");

const UsersController = {
  /**
   * Updates any user details provided, such as fullname, email, or password.
   * Requires the user to provide their current password for validation.
   *
   * @param req - Express request object
   *   - req.params.id: User ID from route params
   *   - req.user: Decoded JWT payload containing authenticated user ID
   *   - req.body: Contains user fields to update
   *     - fullname?: string - New fullname (optional)
   *     - email?: string - New email address (optional)
   *     - password: string - Current password (required for validation)
   *     - newpassword?: string - New password (optional)
   * @param res - Express response object
   * @param next - Express next function for error handling
   *
   * @returns A new JWT token containing the updated user details.
   */
  async updateUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      usersDebug(id);

      // ensure id from route and jwt match
      if (id !== req.user?.id)
        return next(
          ApiError.badRequest(
            `Params ID:${id} does not match JWT ID:${req.user?.id}`
          )
        );

      // get details of user from database
      const userMatch = await findOneUserById(id);
      if (!userMatch) {
        return next(
          ApiError.badRequest(`Something went wrong - User:${id} not found`)
        );
      }

      const passwordMatch = await authUtil.comparePassword(
        req.body.password,
        userMatch.password
      );
      if (!passwordMatch) {
        return next(ApiError.badRequest("Invalid password"));
      }

      // combine all the updates fields, to be processed
      const updates: Partial<UserType> = {};
      if (req.body.fullname !== userMatch.fullname)
        updates.fullname = req.body.fullname;
      if (req.body.email !== userMatch.email) updates.email = req.body.email;
      if (req.body.newpassword) updates.password = req.body.newpassword;

      if (Object.keys(updates).length === 0)
        return next(ApiError.badRequest("No updated details provided"));

      const result = await updateUser(id, updates);
      if (!result) return next();
      const updatedUser = authUtil.omitPasswordField(result);

      // generate and send a new JWT with the updated information
      res.status(200).send({
        token: authUtil.jwtSignUser(updatedUser),
      });
    } catch (error) {
      return next(
        ApiError.internal(
          `Something went wrong while updating User:${req.user?.id}'s details`,
          error
        )
      );
    }
  },
};

export default UsersController;
