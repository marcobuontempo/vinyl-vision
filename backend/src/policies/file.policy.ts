/**
 * File Policy Middleware
 *
 * Validates files sent to the server from client.
 *
 */

// NPM IMPORTS
import { Request, Response, NextFunction } from "express";
import debug from "debug";
import path from "path";
// LOCAL IMPORTS
import ApiError from "../utilities/ApiError.util.js";
import fileUpload from "express-fileupload";

const debugFileUpload = debug("app:fileupload");

export const FilePolicy = {
  /**
   * Check for files passed from client.
   *
   * @param {Request} req - Express request object.
   *   - req.files: The file data to upload.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next function for error handling.
   *
   */
  filesPayloadExists: (req: Request, res: Response, next: NextFunction) => {
    debugFileUpload(req.files);
    if (!req.files?.artwork) {
      return next(ApiError.badRequest("No file uploaded"));
    }
    debugFileUpload("File Payload exists.");
    next();
  },

  /**
   * Check if file exceeds set size.
   *
   * @param {Request} req - Express request object.
   *   - req.files: The file data to upload.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next function for error handling.
   *
   */
  fileSizeLimiter: (req: Request, res: Response, next: NextFunction) => {
    const MB = 5; // 5MB
    const FILE_SIZE_LIMIT = MB * 1024 * 1024;

    if (req.files) {
      const file = req.files.artwork as fileUpload.UploadedFile;

      if (file.size > FILE_SIZE_LIMIT) {
        const message = `${file.name} is over the file size limit of ${MB} MB.`;
        return next(ApiError.tooLarge(message));
      }
    }

    debugFileUpload("File Sizes are valid.");
    next();
  },

  /**
   * Restrict file to accepted file extension types (images ONLY).
   *
   * @param {Array<string>} allowedExtArray - an array of valid file extensions (e.g. [".png", ".gif"])
   * @returns {(req: Request, res: Response, next: NextFunction) => void} Express middleware function.
   *
   */
  fileExtLimiter: (allowedExtArray: Array<string>) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (req.files) {
        const file = req.files.artwork as fileUpload.UploadedFile;

        const fileExtension = path.extname(file.name);
        const allowed = allowedExtArray.includes(fileExtension);
        if (!allowed) {
          const message =
            `Only ${allowedExtArray.toString()} files allowed.`.replaceAll(
              ",",
              ", "
            );

          return next(ApiError.cannotProcess(message));
        }
      }

      debugFileUpload("File Extensions are valid.");
      next();
    };
  },
};

export default FilePolicy;
