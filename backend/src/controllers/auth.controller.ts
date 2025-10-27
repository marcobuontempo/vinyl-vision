/**
 * Auth Controller
 *
 * This controller manages user authentication logic, including registration and login.
 *
 */

// NPM IMPORTS
import { Request, Response, NextFunction } from "express";
import debug from "debug";
// LOCAL IMPORTS
import authUtil from "../utilities/auth.util.js";
import ApiError from "../utilities/ApiError.util.js";
import { createUser, findOneUser } from "../services/users.service.js";

// Debug logger for authentication-related actions
const debugAuth = debug("app:auth");

const AuthController = {
  /**
   * Handles new user registration.
   *
   * @param req - Express request object.
   *   - req.body.fullname: The full name of the user.
   *   - req.body.email: The email address used as the unique identifier.
   *   - req.body.password: The user's plain text password to be hashed.
   * @param res - Express response object for sending the result.
   * @param next - Express next function for error handling.
   *
   * @returns Sends a JSON response with a signed JWT token upon success.
   */
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      // Destructure body
      const { fullname, email, password } = req.body;

      // Check if email already exists
      const userMatch = await findOneUser(email);
      if (userMatch) {
        return next(ApiError.badRequest("This email is already in use"));
      }

      // Save new user to database
      const createdUser = await createUser({
        fullname,
        email,
        password,
        isAdmin: false,
      });

      // Omit password field
      const userDetails = authUtil.omitPasswordField(createdUser);

      // Return User data + JWT
      debugAuth(`Success - User: ${createdUser.id} registered`);
      res.status(201).send({
        token: authUtil.jwtSignUser(userDetails),
      });
    } catch (error) {
      return next(
        ApiError.internal(
          "Something went wrong while registering your profile",
          error
        )
      );
    }
  },

  /**
   * Handles user login.
   *
   * @param req - Express request object.
   *   - req.body.email: The email used to identify the account.
   *   - req.body.password: The plain text password to verify against the stored hash.
   * @param res - Express response object for sending the result.
   * @param next - Express next function for error handling.
   *
   * @returns Sends a JSON response with a signed JWT token upon success.
   */

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // Destructure body
      const { email, password } = req.body;

      // Check if email is in system
      const userMatch = await findOneUser(email);
      if (!userMatch) {
        return next(ApiError.badRequest("Invalid credentials"));
      }

      // Check password matches
      const passwordMatch = await authUtil.comparePassword(
        password,
        userMatch.password
      );
      if (!passwordMatch) {
        return next(ApiError.badRequest("Invalid credentials"));
      }

      // Omit password field
      const userDetails = authUtil.omitPasswordField(userMatch);

      // Return JWT with User Details as payload
      debugAuth(`Success - User: ${userMatch.id} logged in`);
      res.status(200).send({
        token: authUtil.jwtSignUser(userDetails),
      });
    } catch (error) {
      return next(
        ApiError.internal(
          "Something went wrong while logging into your profile",
          error
        )
      );
    }
  },
};

export default AuthController;
