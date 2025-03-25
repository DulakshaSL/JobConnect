const express = require('express');
const multer = require('multer'); // Import multer
const { 
  getJobs, 
  getJobDetails, 
  getCompanyDetailsByJobId, 
  getJobsByRole ,

} = require('../controllers/jobController');

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); // Set the filename with timestamp
  }
});

const upload = multer({ storage: storage }); // Create multer instance with storage configuration

// Routes
router.get('/', getJobs);                    // Get all jobs
router.get('/:id', getJobDetails);           // Get job details by ID
router.get('/company/:jobId', getCompanyDetailsByJobId);  // Get company details by job ID
router.get('/role/:role', getJobsByRole);    // Get jobs by role


module.exports = router;
