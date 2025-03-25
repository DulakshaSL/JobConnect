const express = require('express');
const multer = require('multer');
const { registerEmployer, checkEmployerEmail, loginEmployer, getNumberOfJobs, getApplicantsForJobs, getJobApplicants, updateApplicationStatus, createJob, updateJob, deleteJob, getEmployerJobs } = require('../controllers/employerController');

const router = express.Router();

// Set up multer for file storage if you want to handle company image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Adjust path as needed
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname), // Ensure unique filenames
});

const upload = multer({ storage });

// Route for employer registration and company creation
router.post('/register', upload.single('image'), registerEmployer); // Assuming image is uploaded as 'image'

// Route to fetch all jobs posted by the employer
router.get('/jobs', getEmployerJobs);

// Route to check if employer email already exists
router.post('/check-email', checkEmployerEmail);

// Route for employer login
router.post('/login', loginEmployer);

// Route to get the number of jobs posted by the employer
router.get('/jobs/count', getNumberOfJobs);

// Route to get applicants for jobs posted by the employer
router.get('/jobs/applicants', getApplicantsForJobs);

// Route to get applicants for a specific job
router.get('/jobs/:jobId/applicants', getJobApplicants);

// Route to update the status of an applicant's job application (shortlist or reject)
router.put('/jobs/applications/status', updateApplicationStatus);

// Route for creating a new job posting
router.post('/jobs', upload.single('jobImage'), createJob); // Assuming job image is uploaded as 'jobImage'

// Route for updating an existing job posting
router.put('/jobs/:jobId', updateJob);

// Route for deleting a job posting
router.delete('/jobs/:jobId', deleteJob);

module.exports = router;
