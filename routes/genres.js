import express from "express";
import {
  getAllGenre,
  getSingleGenre,
  createGenre,
  updateGenre,
  deleteGenre,
} from "../controllers/genres.js";
import { auth } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

const router = express.Router();

/***
 * @route   GET /api/genre
 * @desc    Get all genre
 * @access  Public
 *  ***/
router.get("/", getAllGenre);

/***
 * @route   GET /api/genre
 * @desc    Create new genre
 * @access  Private
 *  ***/
router.post("/", auth, createGenre);

/***
 * @route   GET /api/genre/:id
 * @desc    Get genreById
 * @access  Public
 *  ***/
router.get("/:id", getSingleGenre);

/***
 * @route   GET /api/genre/:id
 * @desc    Update genre
 * @access  Private
 *  ***/
router.patch("/:id", auth, updateGenre);

/***
 * @route   GET /api/genre/:id
 * @desc    Delete genre
 * @access  Private
 *  ***/
router.delete("/:id", [auth, admin], deleteGenre);

export default router;
