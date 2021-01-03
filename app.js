import config from "config";
import express from "express";
import Joi from "joi";
import JoiObjId from "joi-objectid";
import winston from "winston";
import connectDB from "./startup/db.js";
import { routes } from "./startup/route.js";
import winstonMongodb from "winston-mongodb";
export const JoiObjectId = JoiObjId(Joi);

const app = express();

/* Initialize routes */
routes(app);

/*
===============================
To enable winston logging, use: 
===============================
| winston.configure()
|   OR
| Create your custom logger with createLogger()
*/

/* Create a custom winston logger with winston.createLogger() */
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  default: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "errs.log" }),
    new winston.transports.MongoDB({
      db: config.get("mongodbURI"),
      level: "error",
      options: {
        useUnifiedTopology: true,
      },
    }),
  ],
});

/*
=============================================================
Handling uncaughtException & unhandledRejection with winston.
=============================================================
// logger.exceptions.handle(
//   new winston.transports.File({ filename: "excep_&_unhandled.log" })
// );
*/

/*
===========================================
Handling uncaughtException errors manually.
===========================================
*/
process.on("uncaughtException", (exception) => {
  const uncaughtExceptionLogger = winston.createLogger({
    level: "error",
    format: winston.format.json(),
    default: { service: "user-service" },
    transports: [
      new winston.transports.File({ filename: "uncaughtException.log" }),
    ],
  });

  uncaughtExceptionLogger.error(exception.message, exception);
  process.exit(1);
});

/*
=============================================
Handling unhandledRejection errors manually.
=============================================
*/
process.on("unhandledRejection", (exception) => {
  const unhandledRejectionLogger = winston.createLogger({
    level: "error",
    format: winston.format.json(),
    default: { service: "user-service" },
    transports: [
      new winston.transports.File({ filename: "promiseRejection.log" }),
    ],
  });

  unhandledRejectionLogger.error(exception.message, exception);
  process.exit(1);
});

if (!config.get("jwtSecret")) {
  console.error("FATAL ERROR: jwtSecret is not defined.");
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

/* Connect to mongodb */
connectDB();

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
