import express from "express";
import AuthController from "../controllers/auth.controller.js";
import AuthPolicy from "../policies/auth.policy.js";

const router = express.Router();

router.post("/register", AuthPolicy.validateAuth, AuthController.register);

router.post("/login", AuthPolicy.validateAuth, AuthController.login);

export default router;
