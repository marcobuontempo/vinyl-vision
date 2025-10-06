/**
 * API Error Handler Middleware
 *
 * Global Express error-handling middleware.
 *
 */

// NPM IMPORTS
import { NextFunction, Request, Response } from "express";
// LOCAL IMPORTS
import ApiError from "../utilities/ApiError.js";

/**
 * Handles errors across the application by sending consistent API responses.
 *
 * @param error - The error object (can be ApiError, Error, or unknown)
 * @param req - Express request object (unused here but required for middleware signature)
 * @param res - Express response object used to send JSON error responses
 * @param next - Express next function (unused here but required for middleware signature)
 *
 * @returns void - Sends a JSON response with appropriate status code and error message.
 */
export const apiErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ApiError) {
    // Known API error (e.g., validation, not found, bad request)
    res.status(error.code).json({ message: error.message });
    return;
  } else if (error instanceof Error) {
    // Unexpected runtime error (logs full error for debugging)
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } else {
    // Unknown non-standard error type
    console.error("Unknown error:", error);
    res.status(500).json({ message: "Unknown error occurred" });
  }
};

export default apiErrorHandler;
