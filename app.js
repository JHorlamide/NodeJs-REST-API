import Joi from "joi";
import express from "express";
import config from "config";
import JoiObjId from "joi-objectid";
import connectDB from "./config/db.js";
import { error } from "./middleware/errorHandler.js";
export const JoiObjectId = JoiObjId(Joi);

/* Routes */
import genres from "./routes/genres.js";
import movie from "./routes/movies.js";
import rental from "./routes/rentals.js";
import user from "./routes/user.js";
import auth from "./routes/auth.js";
import customer from "./routes/custome.js";

const app = express();

if (!config.get("jwtSecret")) {
  console.error("FATAL ERROR: jwtSecret is not defined.");
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

/* Initialize Middleware */
app.use(express.json());

/* Connect to mongodb */
connectDB();

/* Define Routes */
app.use("/api/genres", genres);
app.use("/api/customer", customer);
app.use("/api/movie", movie);
app.use("/api/rentals", rental);
app.use("/api/users", user);
app.use("/api/auth", auth);
app.use(error);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
