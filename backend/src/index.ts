import express from "express";
import "dotenv/config";
import { config } from "./config/index.js";

import morgan from "morgan";
import debug from "debug";

import routes from "./routes/index.js";
import ApiError from "./utlities/ApiError.js";
import apiErrorHandler from "./middleware/apiErrorHandler.middleware.js";
import { connectDatabase } from "./utlities/database.util.js";

const debugStartup = debug("app:startup");

// Initialise Express
debugStartup("Initialising express app...");
const app = express();

// Parse JSON / URLEncoded
debugStartup("Parsing middleware enabled on all routes...");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HTTP Request Logger
app.use(morgan("dev"));

// API Routing
app.use("/api", routes);

// All Invalid Endpoints
app.use((req, res, next) => next(ApiError.notFound()));

// Error Handler
app.use(apiErrorHandler);

// Connect Database
connectDatabase().then(() => {
  // Start Server
  app.listen(config.port, () => {
    debugStartup(`App listening on port ${config.port}`);
  });
});
