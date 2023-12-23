const db = require('../models') //this is where our db mongoose connection lives as well as our models

// Product INDEX ROUTE
const getProduct = (req, res) => {
    // db.Product.find({})  <-- db has all our models in it so we can use any of them here with one line! 
    // res.send('getProduct')
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
const createPeople = (req, res) => {
    // db.People.create({name: 'testing'})
    // .then((res) => {console.log(res)})
    // res.send('createPeople')
    db.People.create(req.body)
    .then((createdPerson) => {
        if(!createdPerson){
            res.status(400).json({message: 'Cannot create Product'})
        } else {
            res.status(201).json({data: createdPerson, message: 'Product created'})
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
            res.status(200).json({Data: updatedPerson, Message: "Product updated"})
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
            res.status(200).json({Data: deletedPerson, Message: "Product deleted"})
        }
    })
}

module.exports = {
    getProduct, 
    createPeople,
    updateProduct, 
    deleteProduct
}
