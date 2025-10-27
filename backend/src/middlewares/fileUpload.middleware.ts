// NPM IMPORTS
import { Request, Response, NextFunction } from "express";
import debug from "debug";
import path from "path";
// LOCAL IMPORTS
import ApiError from "../utilities/ApiError.js";

const debugWRITE = debug("app:write");

/**
 * Uploads files (images) to server.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const fileServerUpload = (req: Request, res: Response, next: NextFunction) => {
  if (req.files) {
    // Handle both single and multiple file uploads
    const fileData = req.files.image;
    const files = Array.isArray(fileData) ? fileData : [fileData];

    for (const file of files) {
      debugWRITE(`Image for Server Processing: ${file.name}`);

      // Append unique filename extension
      const filename = Date.now() + "_" + file.name;
      debugWRITE(`Unique Filename: ${filename}`);

      // Declare server storage directory path
      const uploadPath = path.join(
        __dirname,
        "../../public/uploads/",
        filename
      );

      // Move file to server storage
      file
        .mv(uploadPath)
        .then(() => {
          // Set filanme variable on `res` object and pass to next middleware
          console.log(`Server Upload Successful: ${uploadPath}`);
          res.locals.filename = filename;
          next();
        })
        .catch((error) => {
          if (error)
            return next(
              ApiError.internal(
                "Your file request could not be processed at this time",
                error
              )
            );
        });
    }
  } else {
    next();
  }
};

export { fileServerUpload };
