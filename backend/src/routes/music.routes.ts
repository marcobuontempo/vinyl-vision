/**
 * Music Routes
 *
 * Defines API endpoints for music management operations
 *
 */

// NPM IMPORTS
import express from "express";
// LOCAL IMPORTS
import authMiddleware from "../middlewares/auth.middleware.js";
import MusicController from "../controllers/music.controller.js";
import MusicPolicy from "../policies/music.policy.js";
import FilePolicy from "../policies/file.policy.js";
import { fileServerUpload } from "../middlewares/fileUpload.middleware.js";
import { parseMusicItemFormData } from "../middlewares/formData.middleware.js";

const router = express.Router();

/**
 * @route   GET /music
 * @desc    Get all music items
 * @access  Public
 */
router.get("/", MusicController.getAll);

/**
 * @route   GET /music/featured
 * @desc    Get all featured music items
 * @access  Public
 */
router.get("/featured", MusicController.getFeatured);

/**
 * @route   GET /music/:id
 * @desc    Get a single music item by its ID
 * @access  Public
 */
router.get("/:id", MusicController.getOneById);

/**
 * @route   POST /music
 * @desc    Create a new music item (admin only)
 * @access  Private/Admin
 * @middleware authMiddleware.verifyJwt - validates JWT token
 * @middleware authMiddleware.isAdmin - checks if user is admin
 * @middleware MusicPolicy.validateItem - validates request body
 */
router.post(
  "/",
  [authMiddleware.verifyJwt, authMiddleware.isAdmin],
  parseMusicItemFormData,
  [
    FilePolicy.filesPayloadExists,
    FilePolicy.fileSizeLimiter,
    FilePolicy.fileExtLimiter([".png", ".jpg", ".jpeg", ".gif"]),
    fileServerUpload,
  ],
  MusicPolicy.validateItem,
  MusicController.createMusicItem
);

/**
 * @route   DELETE /music/:id
 * @desc    Delete a single music item by its ID
 * @access  Private/Admin
 * @middleware authMiddleware.verifyJwt - validates JWT token
 * @middleware authMiddleware.isAdmin - checks if user is admin
 */
router.delete(
  "/:id",
  [authMiddleware.verifyJwt, authMiddleware.isAdmin],
  MusicController.deleteOneById
);

export default router;
