const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const buyerController = require('../app/controllers/BuyerController');


router.get('/login', buyerController.login);
router.post('/login', buyerController.authenticate);

router.get('/register', buyerController.register);

router.get('/', buyerController.rerouting);

module.exports = router;