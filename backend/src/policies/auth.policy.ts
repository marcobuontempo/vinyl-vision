/**
 * Authentication Policy Middleware
 *
 * This module defines validation logic for authentication-related requests
 * (login, registration, and password updates). It uses Joi schemas to enforce
 * strict validation rules on request body fields, ensuring that only properly
 * formatted and secure data reaches controllers.
 *
 */

// NPM IMPORTS
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import debug from "debug";
// LOCAL IMPORTS
import ApiError from "../utilities/ApiError.util.js";

// Debug logger for Joi-related actions
const debugJoi = debug("app:joi");

export const AuthPolicy = {
  /**
   * Middleware to validate authentication requests.
   *
   * @param req - Express Request object. Expects user input in `req.body`.
   * @param res - Express Response object (not directly used in this middleware).
   * @param next - Express NextFunction to continue request pipeline or trigger an error.
   */
  validateAuth: (req: Request, res: Response, next: NextFunction) => {
    debugJoi(req.body);

    const schema = Joi.object({
      // FULLNAME (not required - we don't need it for login, and it isn't crucial information)
      // can contain letters, spaces, apostrophes, hyphens
      // between 3-50 characters
      fullname: Joi.string()
        .trim()
        .pattern(/^[\p{L} '-]+$/u)
        .min(3)
        .max(50),

      // EMAIL (required)
      // 2+ domain segments (@example.com => valid, @example => invalid)
      // must be use a real tld (no allow/block lists for specific TLDs though)
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } })
        .required(),

      // PASSWORD (required)
      // between 8-32 characters
      // at least 1 lowercase letter
      // at least 1 digit
      // at least 1 special character: @$!%*?&
      password: Joi.string()
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        )
        .min(8)
        .max(32)
        .required(),

      // NEW PASSWORD (not required - passed when updating)
      // between 8-32 characters
      // at least 1 lowercase letter
      // at least 1 digit
      // at least 1 special character: @$!%*?&
      newpassword: Joi.string()
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        )
        .min(8)
        .max(32),
    }).required();

    const { error } = schema.validate(req.body);

    if (error) {
      debugJoi(error);
      switch (error.details[0].context?.key) {
        case "fullname":
          next(ApiError.badRequest("You must provide a valid fullname"));
          break;

        case "email":
          next(ApiError.badRequest("You must provide a valid email"));
          break;

        case "password":
          next(
            ApiError.badRequest(
              "You must provide a valid password (length: 8-32, 1+ lowercase, 1+ uppercase, 1+ digits, 1+ special characters [@$!%*?&])"
            )
          );
          break;

        default:
          next(
            ApiError.badRequest(
              "Invalid data - please recheck your fields and submit again"
            )
          );
      }
    } else {
      next();
    }
  },
};

export default AuthPolicy;
