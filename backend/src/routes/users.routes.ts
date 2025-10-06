/**
 * Users Routes
 * 
 * Defines API endpoints for user management operations
 * 
 */

// NPM IMPORTS
import express from "express";
// LOCAL IMPORTS
import authMiddleware from "../middlewares/auth.middleware.js";
import UsersController from "../controllers/users.controller.js";
import AuthPolicy from "../policies/auth.policy.js";

const router = express.Router();

/**
 * @route   PUT /users/:id
 * @desc    Update user details by user ID
 * @access  Private
 * @middleware authMiddleware.verifyJwt - validates JWT token
 * @middleware AuthPolicy.validateAuth - validates request body
 */
router.put("/:id", authMiddleware.verifyJwt, AuthPolicy.validateAuth, UsersController.updateUserDetails);

export default router;
