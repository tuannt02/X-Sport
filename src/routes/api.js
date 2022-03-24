const express = require('express');
const router = express.Router();

const apiController = require('../app/controllers/ApiController');

router.get('/login', apiController.index);

router.get('/daily_discover', apiController.show);



module.exports = router;