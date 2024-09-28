import mongoose from "mongoose";
import Product from "../models/product.model.js"
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in fetching products: " + error.message);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};
export const createProduct = async (req, res) => {
  const product = req.body; // user will send this

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id!" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product not found" });
  }
};
export const putProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  // Check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id!" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true, // Return the updated document
    });

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
