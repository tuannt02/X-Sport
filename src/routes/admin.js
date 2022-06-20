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

router.delete('/delete-category/:id', adminController.destroyCategory);

//Brand manager

router.get('/brands/:slug', adminController.brandsManager);

router.get('/search-brands/:slug', adminController.brandsSearch);

router.post('/create-brands', adminController.createBrand);

router.delete('/delete-brand/:id', adminController.destroyBrand);

//Banner manager

router.get('/banners/:slug', adminController.bannersManager);

router.post('/create-banner', adminController.createBanner);

router.delete('/delete-banner/:id', adminController.destroyBanner);

//Order manager

router.get('/orders/preparing', adminController.preparingOrder);

router.get('/orders/inProgress', adminController.inProgressOrder);

router.get('/orders/complete', adminController.completeOrder);

router.get('/order-detail/:id', adminController.detailOrder);

router.put('/orders/move-Inprogress/:id', adminController.moveProgress)

router.put('/orders/move-Complete/:id', adminController.moveComplete)

module.exports = router;