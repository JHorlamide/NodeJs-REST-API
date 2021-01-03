import config from "config";
import debug from "debug";
import mongoose from "mongoose";

const db = config.get("mongodbURI");
const mongoConnection = debug("app:db");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    mongoConnection("Mongodb Connected...");
  } catch (error) {
    console.error(`Could not connect: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
