const express = require('express');
const router = express.Router();

const sellerController = require('../app/controllers/SellerController');

router.get('/login', sellerController.login);

router.get('/register', sellerController.register);

router.get('/', sellerController.show);



module.exports = router;

