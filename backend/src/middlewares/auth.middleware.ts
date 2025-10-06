/**
 * Authentication and Authorisation Middleware
 *
 */

// TYPE IMPORTS
import type { UserType } from "../../../shared/types/user.js";
// NPM IMPORTS
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// LOCAL IMPORTS
import config from "../config/index.js";
import ApiError from "../utilities/ApiError.js";

const authMiddleware = {
  /**
   * Middleware to verify a JWT from the Authorization header.
   *
   * @param req - Express Request object. Expects an "Authorization" header in the format "Bearer <token>".
   * @param res - Express Response object (not directly used in this middleware).
   * @param next - Express NextFunction to pass control to the next middleware or error handler.
   */
  verifyJwt: (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) return next(ApiError.unauthorised());

      // `Bearer <token>`
      const token = authHeader.split(" ")[1]; // exclude the "Bearer" string

      // throws if invalid jwt
      const decoded = jwt.verify(token, config.authentication.jwtSecret);

      req.user = decoded as UserType; // decoded payload

      next();
    } catch (error) {
      next(ApiError.forbidden());
    }
  },

  /**
   * Middleware to enforce administrator access.
   *
   * @param req - Express Request object. Expects `req.user` to be populated by verifyJwt.
   * @param res - Express Response object (not directly used in this middleware).
   * @param next - Express NextFunction to pass control to the next middleware or error handler.
   */
  isAdmin: (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.isAdmin) {
      next();
    } else {
      next(ApiError.forbidden());
    }
  },
};

export default authMiddleware;
