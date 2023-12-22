const router = require('express').Router();
const { productCtrl } = require('../controllers') //all functions/methods imported from people's controller's index.js

// ROUTES - METHODS //
router.get('/', productCtrl.getProduct)
router.post('/', productCtrl.createProduct)
router.put('/:id', productCtrl.updateProduct)
router.delete('/:id', productCtrl.deleteProduct)

module.exports = router;
