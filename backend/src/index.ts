// IMPORTS
import express from "express";
import "dotenv/config";
import { config } from "./config/index.js";

import helmet from "helmet";
import cors from "cors";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import debug from "debug";

import routes from "./routes/index.js";
import ApiError from "./utilities/ApiError.util.js";
import apiErrorHandler from "./middlewares/apiErrorHandler.middleware.js";
import { connectDatabase } from "./utilities/database.util.js";
import { initialiseCloudinary } from "./utilities/image.util.js";

// Debug logger for app startup-related actions
const debugStartup = debug("app:startup");

// Initialise Express
debugStartup("Initialising express app...");
const app = express();

// HTTP Header-setter security & CORS
app.use(helmet());
app.use(cors(config.cors));
debugStartup("Helmet & CORS Pre-Flight requests enabled");

// Parse JSON / URLEncoded
debugStartup("Parsing middleware enabled on all routes...");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// File Parsing Middleware
app.use(fileUpload({ createParentPath: true }));

// HTTP Request Logger
app.use(morgan("dev"));

// API Routing
app.use("/api", routes);

// All Invalid Endpoints
app.use((req, res, next) => next(ApiError.notFound()));

// Error Handler
app.use(apiErrorHandler);

// Define the startup process and order
const startServer = async () => {
  try {
    // Connect to the database
    await connectDatabase();

    // Initialise Cloudinary
    await initialiseCloudinary();

    // Start the server
    app.listen(config.port, () => {
      debugStartup(`App listening on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
