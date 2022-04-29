const express = require('express');
const router = express.Router();

const buyerController = require('../app/controllers/BuyerController');

// Routing /sign_in
router.get(
    '/sign_in',
    buyerController.isAuthen, 
    buyerController.sign_in
    );


router.post(
    '/sign_in', 
    buyerController.authenticate,
    (req,res) => {
        res.redirect('http://localhost:3001/')
    }
);

// Routing /sign_up
router.get('/sign_up', buyerController.sign_up);


// Routing /forget_password
router.get('/forget_password', buyerController.forget_password);

router.get('/', buyerController.rerouting);

module.exports = router;