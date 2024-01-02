const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
        description: String,
        image: {
              data: Buffer,
              contentType: String,
            },
        name: String,
        Price : Number,
        price_id : String ,
})



const Product = mongoose.models.Product || mongoose.model('Product', productSchema);



module.exports = Product

