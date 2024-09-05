const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  brand: String,
  image: String,
  description: String,
  ratings: [{ type: Number }] // Store ratings as an array of numbers
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

