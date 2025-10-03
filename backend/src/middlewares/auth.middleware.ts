import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import ApiError from "../utilities/ApiError.js";
import { UserType } from "../../../shared/types/user.js";

const authMiddleware = {
  verifyJwt: (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) return next(ApiError.unauthorised());

      // Bearer <token>
      const token = authHeader.split(" ")[1]; // exclude the "Bearer" string

      // throws if invalid jwt
      const decoded = jwt.verify(token, config.authentication.jwtSecret);

      req.user = decoded as UserType; // decoded payload

      next();
    } catch (error) {
      next(ApiError.forbidden());
    }
  },
  isAdmin: (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.isAdmin) {
      next();
    } else {
      next(ApiError.forbidden());
    }
  },
};

export default authMiddleware;
