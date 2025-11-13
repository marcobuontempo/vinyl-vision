// TYPES IMPORTS
import type { UserType } from "@my/shared";
// NPM IMPORTS
import { JwtPayload } from "jsonwebtoken";

/**
 *  Allows appending "user" field to the Express `req` object.
 */
declare module "express-serve-static-core" {
  interface Request {
    user?: UserType;
  }
}
