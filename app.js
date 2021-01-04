import express from "express";

/* Orchestrated Module for separation of concerns */
import connectDB from "./startup/db.js";
import { routes } from "./startup/route.js";
import { configSettings } from "./startup/settings.js";
import { JoiObjectIdValidation } from "./startup/validation.js";
import { logger } from "./startup/error_handler.js";
import { NODE_ENV } from "./startup/settings.js";

const app = express();

const PORT = process.env.PORT || 3000;

/* Configuration settings */
configSettings();

/* Connect to mongodb */
connectDB();

/* Initialize routes */
routes(app);

/* JoiObjectId Validation */
JoiObjectIdValidation();

/* Checking node enviroment */
NODE_ENV();

app.listen(PORT, () => {
  logger.info(`server started on port ${PORT}`);
});
