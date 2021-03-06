let express = require('express');
let router = new express.Router();
let catalogController = require('../controllers/catalogController');

// Client routes
router.get('/', catalogController.dashboard);
router.get('/desktops', catalogController.desktop);
router.get('/laptops', catalogController.laptop);
router.get('/monitors', catalogController.monitor);
router.get('/tablets', catalogController.tablet);

module.exports = router;
