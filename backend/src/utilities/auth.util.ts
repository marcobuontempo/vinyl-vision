/**
 * Authentication/Authentication Utilities
 *
 * Provides utility functions for handling user authentication and authorisation
 *
 */

// TYPE IMPORTS
import type { UserType } from "../../../shared/types/user.js";
// NPM IMPORTS
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// LOCAL IMPORTS
import config from "../config/index.js";

/**
 * authUtil: Utility functions for authentication and user security
 */
export const authUtil = {
  /**
   * Remove the password field from a user object
   * @param {UserType} user - The user object
   * @returns {Omit<UserType, "password">} - User object without password
   */
  omitPasswordField: (user: UserType): Omit<UserType, "password"> => {
    const { password, ...userDetails } = user;
    return userDetails;
  },

  /**
   * Hash a plain text password using bcrypt
   * @param {string} password - Plain text password
   * @returns {Promise<string>} - Hashed password
   */
  hashPassword: async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  },

  /**
   * Compare a plain text password with a hashed password
   * @param {string} password - Plain text password
   * @param {string} hashPassword - Hashed password
   * @returns {Promise<boolean>} - True if passwords match, false otherwise
   */
  comparePassword: async (
    password: string,
    hashPassword: string
  ): Promise<boolean> => {
    return await bcrypt.compare(password, hashPassword);
  },

  /**
   * Sign a JWT for a user object
   * @param {Omit<UserType, "password">} user - User object without password
   * @returns {string} - JWT token
   */
  jwtSignUser: (user: Omit<UserType, "password">): string => {
    const payload = user;
    const secret = config.authentication.jwtSecret;
    const tokenExpireTime = 60 * 60 * 24; // 86400 seconds = 1 day

    const token = jwt.sign(payload, secret, {
      algorithm: "HS512",
      expiresIn: tokenExpireTime,
    });
    return token;
  },
};

export default authUtil;
