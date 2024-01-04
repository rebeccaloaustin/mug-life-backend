const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
        description: String,
        image: String,
        name: String,
        price : Number,
        price_id : String ,
})



const Product = mongoose.models.Product || mongoose.model('Product', productSchema);



module.exports = Product

