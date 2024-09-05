const Product = require('../models/product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ statusCode: 200, data: products, message: "Success" });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: "Error fetching products", error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json({ statusCode: 200, message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: "Error adding product", error: error.message });
  }
};

module.exports = { getProducts, addProduct };

