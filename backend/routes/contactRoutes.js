const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { body } = require('express-validator');



// Public route
router.post('/create', contactController.submitContact);

// Protected admin routes
router.get('/', contactController.getAllContacts);
router.put('/contacts/:id/status', contactController.updateContactStatus);

module.exports = router;