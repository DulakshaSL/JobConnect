const express = require('express');
const multer = require('multer'); // Import multer
const { applyForJob } = require('../controllers/applicationController');
const { getApplications } = require('../controllers/applicationController');



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

// Route for applying for a job
router.post('/apply/:jobId', upload.single('cv'), applyForJob);  // Apply with CV file
router.get('/track', getApplications);


module.exports = router;
