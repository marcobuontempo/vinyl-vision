import { JwtPayload } from "jsonwebtoken";
import { UserType } from "../../../shared/types/user.ts";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserType;
  }
}
