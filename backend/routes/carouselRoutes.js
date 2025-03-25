const express = require('express');
const router = express.Router();
const carouselController = require('../controllers/carouselController');

// Route to get all carousel items
router.get('/', carouselController.getCarouselItems);

module.exports = router;
