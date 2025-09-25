import express from "express";
import packagejson from "../../package.json" with { type: "json" };
import ApiError from "../utlities/ApiError.js";

import authRoutes from "./auth.routes.js";

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

export default router;
