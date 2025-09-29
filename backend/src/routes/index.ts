import express from "express";
import packagejson from "../../package.json" with { type: "json" };

import authRoutes from "./auth.routes.js";
import musicRoutes from "./music.routes.js";

const router = express.Router();

// Root Endpoint
router.get("/", (req, res, next) =>
  res.send({
    name: "Vinyl Vision API",
    version: packagejson.version,
    author: packagejson.author,
    description: packagejson.description,
  })
);

// Auth Routes
router.use("/auth", authRoutes);

// Music Routes
router.use("/music", musicRoutes);

export default router;
