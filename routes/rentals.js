import express from "express";
import {
  createRental,
  getAllRentals,
  deleteRental,
} from "../controllers/rentals.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

/***
 * @route   GET /api/rentals
 * @desc    Get all rentals
 * @access  Public
 *  ***/
router.get("/", getAllRentals);

/***
 * @route   GET /api/rentals
 * @desc    Create new rentals
 * @access  Private
 *  ***/
router.post("/", auth, createRental);

/***
 * @route   GET /api/rentals
 * @desc    Delete rentals
 * @access  Private
 *  ***/
router.delete("/:id", auth, deleteRental);

export default router;
