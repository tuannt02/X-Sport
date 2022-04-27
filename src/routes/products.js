const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductsController');


router.get('/create', productController.create);
router.get('/:slug', productController.show);

module.exports = router;