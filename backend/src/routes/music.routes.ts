import express from "express";
import MusicController from "../controllers/music.controller.js";

const router = express.Router();

router.get("/", MusicController.getAll);
router.get("/:id", MusicController.getOneById);

export default router;
