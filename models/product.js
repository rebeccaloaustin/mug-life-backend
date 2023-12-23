const mongoose = require('mongooose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
    description: String,
    image : String,
});


const Product = mongoose.model("Product", productSchema);

module.exports = Product

