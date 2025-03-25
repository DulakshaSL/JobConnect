const pool = require('../config/db'); // Import the MySQL connection pool

// Fetch top hiring companies
async function getTopHiringCompanies() {
  try {
    const [companies] = await pool.query(
      `SELECT id, name, image_path, no_of_jobs 
       FROM company 
       ORDER BY no_of_jobs DESC
       LIMIT 6`
    );
    return companies;
  } catch (error) {
    console.error('Error fetching top hiring companies:', error);
    throw error;
  }
}

module.exports = {
  getTopHiringCompanies,
};
