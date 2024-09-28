import express from "express";
import {
  deleteProduct,
  getProducts,
  createProduct,
  putProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// POST route to create a product
router.post("/", createProduct);

// GET route to fetch all products
router.get("/", getProducts);

// DELETE route to delete a product by id
router.delete("/:id", deleteProduct);

// PUT route to update a product by id
router.put("/:id", putProduct);

export default router;
