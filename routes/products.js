const router = require('express').Router();
const { productCtrl } = require('../controllers') 

// ROUTES - METHODS //
router.get('/', productCtrl.getProduct)
router.post('/', productCtrl.createProduct)
router.put('/:id', productCtrl.updateProduct)
router.delete('/:id', productCtrl.deleteProduct)

module.exports = router;
