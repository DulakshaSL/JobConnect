const express = require('express');
const latestJobsController = require('../controllers/latestJobsController');

const router = express.Router();

// Get latest jobs for the homepage
router.get('/', latestJobsController.getLatestJobs);

// Get job by ID
router.get('/:id', latestJobsController.getJobById);

module.exports = router;
