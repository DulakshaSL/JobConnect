const Company = require('../models/companyModel'); // Import the Company model

// Get top hiring companies
async function getTopHiringCompanies(req, res) {
  try {
    const companies = await Company.getTopHiringCompanies();
    if (companies.length === 0) {
      return res.status(404).json({ message: 'No top hiring companies found' });
    }
    res.status(200).json(companies);
  } catch (error) {
    console.error('Error fetching top hiring companies:', error);
    res.status(500).json({ message: 'Error fetching top hiring companies' });
  }
}

module.exports = {
  getTopHiringCompanies,
};
