import config from "config";
import winston from "winston";
import { logger } from "../startup/error_handler.js";

/* Configuration settings for Json Web Token */
export const configSettings = () => {
  if (!config.get("jwtSecret")) {
    throw new Error("FATAL ERROR: jwtSecret is not defined.");
  }
};

/* Checking NODE_ENV */
export const NODE_ENV = () => {
  if (process.env.NODE_ENV !== "production") {
    logger.info("NODE_ENV NOT IN PRODUCTION.");
  }
};
