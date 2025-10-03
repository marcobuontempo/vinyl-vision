import { Request, Response, NextFunction } from "express";
import debug from "debug";
import ApiError from "../utilities/ApiError.js";
import { findOneUserById, updateUser } from "../services/users.service.js";
import { UserType } from "../../../shared/types/user.js";
import authUtil from "../utilities/auth.util.js";

const usersDebug = debug("app:users");

const UsersController = {
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
