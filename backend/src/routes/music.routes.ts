import express from "express";
import MusicController from "../controllers/music.controller.js";

const router = express.Router();

router.get("/", MusicController.getAll);

export default router;
