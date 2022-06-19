const express = require('express');
const router = express.Router();
const { requireAuth, checkUser } = require('../app/middleware/UserMiddleware');
const userController = require('../app/controllers/UserController');

// Routing /sign_in
router.get(
    '/sign_in',
    userController.isAuthen, 
    userController.sign_in
    );


// Routing /sign_in
router.post('/sign_in', userController.sign_in_post);



// Routing /sign_up
router.get('/sign_up', userController.sign_up);

router.post('/sign_up', userController.sign_up_post);


// Routing /forget_password
router.get('/forget_password', userController.forget_password);

// Routing /user/account/:slug
router.get('/account/:slug', 
            requireAuth,
            userController.account);

router.post('/account/address',
            requireAuth,
            checkUser,
            userController.postAddr);

router.post('/account/address/default_addr',
            requireAuth,
            checkUser,
            userController.default_addr);

router.post('/account/address/del_addr',
            requireAuth,
            checkUser,
            userController.del_addr);         

// Routing /user/purchase
router.get('/purchase', 
            requireAuth,
            userController.purchase);

// Routing /user/notifications
router.get('/notifications', 
            requireAuth,
            userController.notifications);


router.get('/cart',
            requireAuth,
            userController.cart);

router.delete('/cart/:id', userController.removeCart);

router.post('/add-to-cart', userController.addToCart);

router.put('/edit-quantity', userController.updateQuantityProduct);

router.get('/checkout', userController.checkout);

router.post('/order', userController.storeOrder);

router.get('/',
    userController.rerouting);

module.exports = router;