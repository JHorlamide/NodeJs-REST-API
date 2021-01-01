import express from "express";
import { createUser, getLoggedInUser } from "../controllers/user.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

/***
 * @route   GET /api/user/me
 * @desc    Get logged in user
 * @access  Private
 *  ***/
router.get("/me", auth, getLoggedInUser);

/***
 * @route   GET /api/auth
 * @desc    Create new user
 * @access  Private
 *  ***/
router.post("/", createUser);

export default router;
