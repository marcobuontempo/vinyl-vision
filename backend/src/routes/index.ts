/**
 * Main Routes
 * 
 * Defines API routes to each separate concern (i.e. users, routes, etc.)
 * 
 */

// PACKAGE JSON IMPORT
import packagejson from "../../package.json" with { type: "json" };
// NPM IMPORTS
import express from "express";
// ROUTES
import authRoutes from "./auth.routes.js";
import userRoutes from "./users.routes.js";
import musicRoutes from "./music.routes.js";

const router = express.Router();

/**
 * @route   GET /
 * @desc    Root endpoint - returns API metadata
 * @access  Public
 */
router.get("/", (req, res, next) =>
  res.send({
    name: "Vinyl Vision API",
    version: packagejson.version,
    author: packagejson.author,
    description: packagejson.description,
  })
);

/**
 * @route   /auth
 * @desc    Authentication/Authorisation related routes
 */
router.use("/auth", authRoutes);

/**
 * @route   /users
 * @desc    User related routes (CRUD)
 */
router.use("/users", userRoutes);


/**
 * @route   /music
 * @desc    Music related routes (CRUD)
 */
router.use("/music", musicRoutes);


export default router;
