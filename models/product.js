const mongoose = require('mongooose');

const productSchema = new mongoose.Schema({
    name: string,
    price: number,
    stock: number,
    description: string,
    image : string,
})


const Product = mongoose.model('Product', productSchema);

module.exports = Product; 

