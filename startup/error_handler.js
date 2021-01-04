import config from "config";
import winston from "winston";
import winston_mongoDB from 'winston-mongodb';

/*
===============================================
To use winston, read npm winston documentation
===============================================
| winston.configure()
*/

/* Create a custom winston logger with winston.createLogger() */
export const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({
      level: "info",
      colorize: true,
      prettyPrint: true,
    }),

    new winston.transports.MongoDB({
      db: config.get("mongodbURI"),
      level: "error",
      options: {
        useUnifiedTopology: true,
      },
    }),

    new winston.transports.File({
      filename: 'errs.log',
      level: 'error'
    })
  ],

  /*
  =================================================================
  Handling uncaughtException with winston
  =================================================================
  */
  exceptionHandlers: [
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true,
    }),

    new winston.transports.File({
      filename: "exceptions.log",
      handleExceptions: true,
      level: "error",
    }),
  ],

  /*
  =================================================================
  Handling unHandleRejection with winston
  =================================================================
  */
  rejectionHandlers: [
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true,
    }),

    new winston.transports.File({
      filename: "exceptions.log",
      handleRejections: true,
    }),
  ],
});

/*
===========================================
Handling uncaughtException errors manually.
===========================================
|NOTE: Handling exceptions manually does not
|
*/

// process.on("uncaughtException", (exceptions) => {
//   console.error("GOT AN UNCAUGHT EXCEPTION");

//   const uncaughtExceptionHandler = winston.createLogger({
//     level: "error",
//     format: winston.format.json(),
//     transports: [new winston.transports.File({ filename: "exceptions.log" })],
//   });

//   uncaughtExceptionHandler.error(exceptions.message, exceptions);
// });

/*
=============================================
Handling unhandledRejection errors manually.
=============================================
*/

// process.on("unhandledRejection", (exceptions) => {
//   console.error("GOT AND UNAHANDLED REJECTION");

//   const unhandledRejectionHandler = winston.createLogger({
//     level: "error",
//     format: winston.format.json(),
//     transports: [new winston.transports.File({ filename: "rejection.log" })],
//   });

//   unhandledRejectionHandler.error(exceptions.message, exceptions);
// });
