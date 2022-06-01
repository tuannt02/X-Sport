const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');


// router.get('/create-product', adminController.createProduct);
router.get('/create-product', adminController.createProduct);

router.post('/store-product', adminController.storeProduct);

router.get('/view-product', adminController.productView);

router.get('/search-product', adminController.productSearch);

router.delete('/:id', adminController.destroyProduct);

module.exports = router;