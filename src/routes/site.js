const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/logout', siteController.logout);
router.get('/search', siteController.search);
router.get('/csbh', siteController.csbh);
router.get('/category', siteController.category);
router.get('/', siteController.index);

module.exports = router;