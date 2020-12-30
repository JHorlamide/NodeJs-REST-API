import express from "express";
import {
  getAllMovies,
  createMovie,
  deleteMovie,
} from "../controller/movies.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

/***
 * @route   GET /api/movie
 * @desc    Get all movies
 * @access  Public
 *  ***/
router.get("/", getAllMovies);

/***
 * @route   GET /api/movie
 * @desc    Create new movie
 * @access  Private
 *  ***/
router.post("/", auth, createMovie);

/***
 * @route   GET /api/movie
 * @desc    Delete movie
 * @access  Private
 *  ***/
router.delete("/:id", auth, deleteMovie);

export default router;
