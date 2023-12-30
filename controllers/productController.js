// controllers/productController.js

const Product = require('../models/product');

// const getProduct = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const createProduct = async (req, res) => {
//   try {
//     const { name, price, description } = req.body;
//     const newProduct = new Product({ name, price, description });
//     await newProduct.save();
//     res.status(201).json({ message: 'Product created successfully', product: newProduct });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, price, description } = req.body;

//     const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description }, { new: true });

//     if (!updatedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     res.json({ message: 'Product updated successfully', product: updatedProduct });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedProduct = await Product.findByIdAndDelete(id);

//     if (!deletedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     res.json({ message: 'Product deleted successfully', product: deletedProduct });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   getProduct,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// };

const db = require('../models') //this is where our db mongoose connection lives as well as our models

// PEOPLE INDEX ROUTE
const getProduct = (req, res) => {
    // db.People.find({})  <-- db has all our models in it so we can use any of them here with one line! 
    // res.send('getPeople')
    db.Product.find({})
    .then((foundProduct) => {
        if(!foundProduct){
            res.status(404).json({message: 'Cannot find Product'})
        } else {
            res.status(200).json({data: foundProduct})
        }
    })
}

// Product CREATE ROUTE
const createProduct = (req, res) => {
    // db.People.create({name: 'testing'})
    // .then((res) => {console.log(res)})
    // res.send('createPeople')
    db.Product.create(req.body)
    .then((createdProduct) => {
        if(!createdProduct){
            res.status(400).json({message: 'Cannot create Product'})
        } else {
            res.status(201).json({data: createdProduct, message: 'Product created'})
        }
    })
}

// Product UPDATE ROUTE
const updateProduct = (req, res) => {
    db.Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedProduct) => {
        if(!updatedProduct){
            res.status(400).json({Message: 'Could not update product'})
        } else {
            res.status(200).json({Data: updatedProduct, Message: "Product updated"})
        }
    })
}

// Product DESTROY ROUTE
const deleteProduct = (req, res) => {
    db.Product.findByIdAndDelete(req.params.id)
    .then((deletedProduct) => {
        if(!deletedProduct){
            res.status(400).json({Message: 'Could not delete product'})
        } else {
            res.status(200).json({Data: deletedProduct, Message: "Product deleted"})
        }
    })
}

module.exports = {
    getProduct, 
    createProduct,
    updateProduct, 
    deleteProduct
}
