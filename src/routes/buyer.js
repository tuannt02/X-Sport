const express = require('express');
const router = express.Router();

const buyerController = require('../app/controllers/BuyerController');


router.get(
    '/login',
    buyerController.isAuthen, 
    buyerController.login
    );


router.post(
    '/login', 
    buyerController.authenticate,
    (req,res) => {
        res.redirect('http://localhost:3001/')
    }
);

router.get('/register', buyerController.register);

router.get('/', buyerController.rerouting);

module.exports = router;