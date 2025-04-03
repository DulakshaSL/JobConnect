// routes/ratingRoutes.js
const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');



// Public routes
router.get('/', ratingController.getRecentRatings);
router.get('/average', ratingController.getAverageRating);
router.get('/user/:id', ratingController.getUserRatings);

module.exports = router;