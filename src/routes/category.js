const express = require('express');
const router = express.Router();
const { requireAuth } = require('../app/middleware/UserMiddleware');
const categoryController = require('../app/controllers/CategoryController');


router.post('/:slug', categoryController.search);
router.get('/:slug', categoryController.show);

module.exports = router;