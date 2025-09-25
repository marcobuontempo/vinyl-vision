import { Request, Response, NextFunction } from "express";

export const AuthController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
