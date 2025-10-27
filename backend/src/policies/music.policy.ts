/**
 *
 * Music Policy Middlware
 *
 * Defines the schema for "music" items in the database,
 * and validates requests containing them as payloads
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

export const MusicPolicy = {
  /**
   * Middleware to validate an incoming music item request body.
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   */
  validateItem: (req: Request, res: Response, next: NextFunction) => {
    debugJoi(req.body);

    const schema = Joi.object({
      // TITLE
      title: Joi.string().trim().min(1).required(),

      // ARTIST
      artist: Joi.string().trim().min(1).required(),

      // DESCRIPTION
      description: Joi.string().trim().min(1).required(),

      // GENRE
      genre: Joi.string().trim().min(1).required(),

      // RELEASE DATE
      release_date: Joi.string()
        .trim()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required(),

      // ARTWORK
      artwork: Joi.string()
        .trim()
        .uri({ scheme: [/https?/] })
        .required(),

      // TRACK LENGTH
      length: Joi.number().integer().min(1).max(86400).required(),

      // PRICE $AUD
      price_aud: Joi.number().integer().min(0).required(),

      // FEATURED ITEM
      featured: Joi.bool().required(),
    }).required();

    const { error } = schema.validate(req.body);

    if (error) {
      debugJoi(error);
      switch (error.details[0].context?.key) {
        case "title":
          next(ApiError.badRequest("You must provide a valid title"));
          break;

        case "artist":
          next(ApiError.badRequest("You must provide a valid artist"));
          break;

        case "description":
          next(ApiError.badRequest("You must provide a valid description"));
          break;

        case "genre":
          next(ApiError.badRequest("You must provide a valid genre"));
          break;

        case "release_date":
          next(
            ApiError.badRequest(
              "You must provide a valid release_date (YYYY-MM-DD)"
            )
          );
          break;

        case "artwork":
          next(
            ApiError.badRequest(
              "You must provide a valid artwork URL (i.e. http:// or https://)"
            )
          );
          break;

        case "length":
          next(
            ApiError.badRequest(
              "You must provide a valid track length (seconds, as integer)"
            )
          );
          break;

        case "price_aud":
          next(
            ApiError.badRequest(
              "You must provide a valid price in AUD cents (i.e. 100 = $1, as integer)"
            )
          );
          break;

        case "featured":
          next(
            ApiError.badRequest(
              "You must provide a valid featured flag (true/false)"
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

export default MusicPolicy;
