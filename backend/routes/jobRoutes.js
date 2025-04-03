const express = require('express');
const multer = require('multer');
const { 
  getJobs, 
  getJobDetails, 
  getCompanyDetailsByJobId, 
  getJobsByRole,
  getJobFieldsWithCounts,
  getJobsByField
} = require('../controllers/jobController');

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Existing routes
router.get('/', getJobs);                    // Get all jobs
router.get('/:id', getJobDetails);           // Get job details by ID
router.get('/company/:jobId', getCompanyDetailsByJobId);  // Get company details by job ID
router.get('/role/:role', getJobsByRole);    // Get jobs by role

// New field-based category routes
router.get('/fields/counts', getJobFieldsWithCounts);      // Get all fields with job counts
router.get('/field/:field', getJobsByField);               // Get jobs by specific field

module.exports = router;