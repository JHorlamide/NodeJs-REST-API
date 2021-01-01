import express from "express";
import {
  getAllCustomer,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

/***
 * @route   GET /api/customer
 * @desc    Get all customers
 * @access  Public
 *  ***/
router.get("/", getAllCustomer);

/***
 * @route   GET /api/customer
 * @desc    Create new customer
 * @access  Private
 *  ***/
router.post("/", auth, createCustomer);

/***
 * @route   GET /api/customer
 * @desc    Get customerById
 * @access  Public
 *  ***/
router.get("/:id", getCustomerById);

/***
 * @route   GET /api/customer
 * @desc    Update customer
 * @access  Private
 *  ***/
router.patch("/:id", auth, updateCustomer);

/***
 * @route   GET /api/customer
 * @desc    Delete customer
 * @access  Private
 *  ***/
router.delete("/:id", auth, deleteCustomer);

export default router;
