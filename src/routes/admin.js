const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');


// router.get('/create-product', adminController.createProduct);
router.get('/create-product', adminController.createProduct);

router.post('/store-product', adminController.storeProduct);

router.get('/view-product', adminController.productView);

router.get('/search-product', adminController.productSearch);

router.delete('/:id', adminController.destroyProduct);

router.get('/edit-view-product/:id', adminController.editView);

router.put('/edit-product/:id', adminController.updateProduct)

//Category manager

router.get('/categories/:slug', adminController.categoriesManager);

router.get('/search-categories/:slug', adminController.categoriesSearch);

router.post('/create-category', adminController.createCategory);

//Brand manager

router.get('/brands/:slug', adminController.brandsManager);

router.get('/search-brands/:slug', adminController.brandsSearch);

router.post('/create-brands', adminController.createBrand);


//Banner manager

router.get('/banners/:slug', adminController.bannersManager);

router.post('/create-banner', adminController.createBanner);

router.delete('/delete-banner/:id', adminController.destroyBanner);


module.exports = router;