// NPM IMPORTS
import { Request, Response, NextFunction } from "express";
import debug from "debug";
import path from "path";
// LOCAL IMPORTS
import ApiError from "../utilities/ApiError.util.js";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import { imageUpload } from "../utilities/image.util.js";

const debugWrite = debug("app:write");

// Define the current directory and path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Uploads file (image) to server.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const fileServerUpload = (req: Request, res: Response, next: NextFunction) => {
  if (req.files) {
    const file = req.files.artwork as fileUpload.UploadedFile;

    debugWrite(`Image for Server Processing: ${file.name}`);

    // Append unique filename extension
    const filename = Date.now() + "_" + file.name;
    debugWrite(`Unique Filename: ${filename}`);

    // Declare server storage directory path
    const uploadPath = path.join(__dirname, "../../public/uploads/", filename);

    // Move file to server storage
    file
      .mv(uploadPath)
      .then(() => {
        // Set filename variable on `res` object and pass to next middleware
        console.log(`Server Upload Successful: ${uploadPath}`);
        return filename;
      })
      .then((filename) => {
        // Upload to Cloudinary
        console.log("Uploading image externally...");
        return imageUpload(filename);
      })
      .then((uploadResult) => {
        if (uploadResult?.data) {
          // Update the new Cloudinary URL to the req.body
          req.body.artwork = uploadResult.data.secure_url;
          next();
        } else {
          // Something went wrong if no image was stored
          throw new Error("Image could not be processed.");
        }
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
  } else {
    next();
  }
};

export { fileServerUpload };
