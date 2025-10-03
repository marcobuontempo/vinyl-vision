import express from "express";
import MusicController from "../controllers/music.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import MusicPolicy from "../policies/music.policy.js";

const router = express.Router();

// Regular Routes
router.get("/", MusicController.getAll);
router.get("/featured", MusicController.getFeatured);
router.get("/:id", MusicController.getOneById);

// Admin Routes
router.post("/", authMiddleware.verifyJwt, authMiddleware.isAdmin, MusicPolicy.validateItem, MusicController.createMusicItem);

export default router;
