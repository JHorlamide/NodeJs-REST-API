import express from "express";

/* Routes */
import genres from "../routes/genres.js";
import movie from "../routes/movies.js";
import rental from "../routes/rentals.js";
import user from "../routes/user.js";
import auth from "../routes/auth.js";
import customer from "../routes/custome.js";
import { error } from "../middleware/error_handler.js";

export const routes = (app) => {
  /* Initialize Middleware */
  app.use(express.json());

  /* Define Routes */
  app.use("/api/genres", genres);
  app.use("/api/customer", customer);
  app.use("/api/movie", movie);
  app.use("/api/rentals", rental);
  app.use("/api/users", user);
  app.use("/api/auth", auth);
  app.use(error);
};
