import config from "config";
import debug from "debug";
import mongoose from "mongoose";

/* Testing code orchestration */
import { asyncMiddleware } from "../middleware/asyncMiddleware.js";
import { logger } from "../startup/error_handler.js";

const db = config.get("mongodbURI");
const mongoConnection = debug("app:db");

const connectDB = asyncMiddleware(async () => {
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  logger.info("Mongodb Connected...");
  mongoConnection("Mongodb Connected...");
});

export default connectDB;
