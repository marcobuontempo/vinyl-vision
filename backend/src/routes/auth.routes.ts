/**
 * Auth Routes
 * 
 * Defines API endpoints for authentication/authorisation management operations
 * 
 */

// NPM IMPORTS
import express from "express";
// LOCAL IMPORTS
import AuthController from "../controllers/auth.controller.js";
import AuthPolicy from "../policies/auth.policy.js";

const router = express.Router();

/**
 * @route   POST /register
 * @desc    Register a new user
 * @access  Public
 * @middleware AuthPolicy.validateRegister - validates registration request body
 */
router.post("/register", AuthPolicy.validateAuth, AuthController.register);

/**
 * @route   POST /login
 * @desc    Authenticate user and return access token
 * @access  Public
 * @middleware AuthPolicy.validateLogin - validates login request body
 */
router.post("/login", AuthPolicy.validateAuth, AuthController.login);

export default router;
