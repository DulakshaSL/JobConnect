const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController'); // Import the Company controller

// Route to get top hiring companies
router.get('/top-hiring-companies', companyController.getTopHiringCompanies);

module.exports = router;
