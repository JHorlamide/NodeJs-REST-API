// import winston from "winston";
import { logger } from "../startup/error_handler.js";

export const error = (err, req, res, next) => {
  logger.error(err.message, err);
  res.status(500).send("Internal server error, could not perform request.");
};
