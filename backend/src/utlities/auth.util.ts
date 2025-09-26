import config from "../config/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { UserType } from "../../../shared/types/user.js";

export const authUtil = {
  omitPasswordField: (user: UserType) => {
    const { password, ...userDetails } = user;
    return userDetails;
  },

  hashPassword: async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  },

  comparePassword: async (password: string, hashPassword: string) => {
    return await bcrypt.compare(password, hashPassword);
  },

  jwtSignUser: (user: Omit<UserType, "password">) => {
    const payload = user;
    const secret = config.authentication.jwtSecret;
    const tokenExpireTime = 60 * 60 * 24; // 86400 seconds = 1 day

    const token = jwt.sign(payload, secret, { expiresIn: tokenExpireTime });
    return token;
  },
};

export default authUtil;
