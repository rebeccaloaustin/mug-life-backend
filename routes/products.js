const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');


// ROUTES - METHODS //
router.get('/products/', productCtrl.getProduct)
router.get('/products/:id', productCtrl.getProductById);
router.post('/products/', productCtrl.createProduct)
router.put('/products/:id', productCtrl.updateProduct)
router.delete('/products/:id', productCtrl.deleteProduct)

module.exports = router;
