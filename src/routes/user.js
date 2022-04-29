const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

// Routing /sign_in
router.get(
    '/sign_in',
    userController.isAuthen, 
    userController.sign_in
    );


router.post(
    '/sign_in', 
    userController.authenticate,
    (req,res) => {
        res.redirect('http://localhost:3001/')
    }
);

// Routing /sign_up
router.get('/sign_up', userController.sign_up);


// Routing /forget_password
router.get('/forget_password', userController.forget_password);

// Routing /user/account/:slug
router.get('/account/:slug', userController.account);


// Routing /user/purchase


// Routing /user/notifications




router.get('/', userController.rerouting);

module.exports = router;