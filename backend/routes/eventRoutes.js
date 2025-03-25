// src/routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getEvents, createEvent } = require('../controllers/eventController');

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
router.get('/events', getEvents);  // Get all events
router.post('/createevents', upload.single('image'), createEvent);  // Create event with image upload

module.exports = router;
