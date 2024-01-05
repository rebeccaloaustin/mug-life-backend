// controllers/productController.js

const Product = require("../models/Product");
const fs = require("fs");
const formidable = require("formidable");
const lodash = require("lodash");
// const { errorHandler } = require("../helpers/dbErrorHandler");

const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProductById = async (req, res) => {
  try {
      const { id } = req.params;
    const product = await Product.findById(id).exec();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, price_id } = req.body;
    const newProduct = new Product({ name, price, description, image, price_id } );
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, image } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description, image }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// module.exports = {
//   getProduct,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// };

module.exports = {
  getProduct,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
