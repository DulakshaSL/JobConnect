const db = require('../config/db'); // Import the MySQL connection pool

const LatestJobsModel = {
  // Fetch the latest jobs (sorted by posted_date)
  getLatest: async () => {
    const query = 'SELECT * FROM jobs ORDER BY posted_date DESC LIMIT 5'; // Fetch latest 5 jobs
    const [jobs] = await db.execute(query); // Use db.execute for prepared statements
    return jobs;
  },

  // Fetch a job by ID
  getJobById: async (id) => {
    const query = 'SELECT * FROM jobs WHERE id = ?';
    const [job] = await db.execute(query, [id]); // Use db.execute for prepared statements
    return job[0]; // Return the first job found (since we're querying by ID)
  }
};

module.exports = LatestJobsModel;
