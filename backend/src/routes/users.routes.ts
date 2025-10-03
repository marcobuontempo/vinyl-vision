import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import UsersController from "../controllers/users.controller.js";
import AuthPolicy from "../policies/auth.policy.js";

const router = express.Router();

router.put("/:id", authMiddleware.verifyJwt, AuthPolicy.validateAuth, UsersController.updateUserDetails);

export default router;
