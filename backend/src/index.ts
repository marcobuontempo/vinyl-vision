import express from "express";
import "dotenv/config";
import { config } from "./config/index.js";

import routes from "./routes/index.js";
import ApiError from "./utlities/ApiError.js";
import apiErrorHandler from "./middleware/apiErrorHandler.middleware.js";
import { dbPing } from "./config/db.js";

// Initialise Express
const app = express();

// Parse JSON / URLEncoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routing
app.use("/api", routes);

// All Invalid Endpoints
app.use((req, res, next) => next(ApiError.notFound()));

// Error Handler
app.use(apiErrorHandler);

// Start Server
dbPing.then(() => {
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
});
