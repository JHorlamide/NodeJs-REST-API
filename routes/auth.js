import express from "express";
import { authUser } from "../controllers/auth.js";

const router = express.Router();

/***
 * @route   GET /api/auth
 * @desc    logged in user
 * @access  Public
 *  ***/
router.post("/", authUser);

export default router;
