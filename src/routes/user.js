const express = require('express');
const router = express.Router();
const { requireAuth } = require('../app/middleware/UserMiddleware');
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


router.get('/',
    userController.rerouting);

module.exports = router;