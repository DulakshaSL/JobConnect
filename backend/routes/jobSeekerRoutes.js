const express = require('express');
const multer = require('multer');
const { createJobSeeker } = require('../controllers/jobSeekerController');
const { checkEmail } = require('../controllers/jobSeekerController');
const { loginJobSeeker } = require('../controllers/jobSeekerController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

router.post('/signup', upload.single('cv'), createJobSeeker);


// Route to check if email already exists
router.post('/check-email', checkEmail);




// Route for job seeker login
router.post('/login', loginJobSeeker);

module.exports = router;

