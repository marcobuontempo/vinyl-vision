import { Request, Response, NextFunction } from "express";
import { createUser, findOneUser } from "../services/users.service.js";
import ApiError from "../utilities/ApiError.js";
import debug from "debug";
import authUtil from "../utilities/auth.util.js";

const debugAuth = debug("app:auth");

const AuthController = {
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
      res.send({
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
      res.send({
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
