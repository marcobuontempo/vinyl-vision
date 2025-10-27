/**
 * Image Utilities
 *
 * Provides helper functions for connecting to Cloudinary Image Services,
 * uploading, and deleting files.
 *
 */

// NPM IMPORTS
import { v2 as cloudinary, UploadApiOptions } from "cloudinary";
import debug from "debug";
import { v4 as uuidv4 } from "uuid";
// LOCAL IMPORTS
import config from "../config/index.js";

// Debug logger for Rrror(#500)-related actions
const debugCloudinary = debug("app:cloudinary");
const debugError500 = debug("app:error500");

/**
 * Initialise connection to Cloudinary and its uploader
 */
const initialiseCloudinary = async () => {
  try {
    // Configure Cloudinary with credentials
    cloudinary.config({
      cloud_name: config.cloudinary.cloud_name,
      api_key: config.cloudinary.api_key,
      api_secret: config.cloudinary.api_secret,
    });
  } catch (error) {
    debugError500(error);
  }
};

/**
 * Uploads an image to Cloudinary
 *
 * @param filename
 */
const imageUpload = async (filename: string) => {
  try {
    // Set options for the upload
    const serverFilePath = `./public/uploads/${filename}`;
    const uploadOptions: UploadApiOptions = {
      resource_type: "auto", // Automatically detect image/video/raw
      folder: "vinyl-vision",
      public_id: uuidv4(),
      tags: ["artwork"],
    };

    // Request upload to cloudinary service
    const uploadResult = await cloudinary.uploader.upload(
      serverFilePath,
      uploadOptions
    );
    debugCloudinary(uploadResult);

    return {
      success: true,
      data: {
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
        url: uploadResult.url,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        bytes: uploadResult.bytes,
        created_at: uploadResult.created_at,
      },
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Failed to upload image to Cloudinary";

    return {
      success: false,
      error: message,
    };
  }
};

/**
 * Gets the ID of an uploaded image
 *
 * @param secureUrl
 * @returns
 */
const getFileIdFromUrl = (secureUrl: string) => {
  try {
    // Find the position of '/upload/' in the URL
    const uploadIndex = secureUrl.indexOf("/upload/");

    // Get everything after '/upload/' and split by '/' to get uuid + public_id (latter we want!)
    const afterUpload = secureUrl.substring(uploadIndex + 8); // 8 = length of '/upload/'
    const parts = afterUpload.split("/");

    // Join all parts after the version (index 1) to reconstruct the full public_id
    const publicIdWithExtension = parts.slice(1).join("/");
    console.log(`publicId with extension: ${publicIdWithExtension}`);

    // Remove file extension by finding the last dot
    const lastDotIndex = publicIdWithExtension.lastIndexOf(".");
    const publicId = publicIdWithExtension.substring(0, lastDotIndex);

    debugCloudinary(`publicId is: ${publicId}`);
    return publicId;
  } catch (error) {
    console.error("Error extracting public_id from URL:", error);
    return null;
  }
};

/**
 * Deletes an image from Cloudinary given its unique ID
 * @param publicId
 * @returns
 */
const deleteImage = async (publicId: string) => {
  try {
    // Cue deletion of image via public id (from above fnc)
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    // Return simple success message
    return {
      success: result.result === "ok",
      data: result,
    };
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Failed to upload image to Cloudinary";

    return {
      success: false,
      error: message,
    };
  }
};

export { initialiseCloudinary, getFileIdFromUrl, deleteImage, cloudinary };
