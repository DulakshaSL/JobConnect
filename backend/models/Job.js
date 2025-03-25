const db = require('../config/db'); // Import the MySQL connection pool

const JobModel = {
  // Fetch all jobs
  getAllJobs: async () => {
    try {
      const [jobs] = await db.execute('SELECT * FROM jobs');
      return jobs;
    } catch (error) {
      console.error('Error fetching all jobs:', error);
      throw error;
    }
  },

  // Fetch job by ID
  getJobById: async (id) => {
    try {
      const [job] = await db.execute('SELECT * FROM jobs WHERE id = ?', [id]);
      return job[0]; // Return the first job found (since we're querying by ID)
    } catch (error) {
      console.error('Error fetching job by ID:', error);
      throw error;
    }
  },

  // Fetch job details with company information by job ID
  getJobWithCompanyById: async (id) => {
    try {
      const [jobWithCompany] = await db.execute(
        `SELECT jobs.*, company.name AS company_name, company.company_overview, company.image_path, company.no_of_jobs
         FROM jobs
         LEFT JOIN company ON jobs.company_id = company.id
         WHERE jobs.id = ?`,
        [id]
      );
      return jobWithCompany[0]; // Return the job details with company info
    } catch (error) {
      console.error('Error fetching job with company by ID:', error);
      throw error;
    }
  },

  // Fetch company details using the job's company_id
  getCompanyByJobId: async (jobId) => {
    try {
      const [companyDetails] = await db.execute(
        `SELECT company.name AS company_name, company.company_overview, company.image_path, company.no_of_jobs
         FROM jobs
         LEFT JOIN company ON jobs.company_id = company.id
         WHERE jobs.id = ?`,
        [jobId]
      );
      return companyDetails[0]; // Return the company details
    } catch (error) {
      console.error('Error fetching company details by job ID:', error);
      throw error;
    }
  },

  // Fetch jobs by role
  getJobsByRole: async (role) => {
    try {
      const [jobs] = await db.execute('SELECT * FROM jobs WHERE role = ?', [role]);
      return jobs; // Return all jobs matching the role
    } catch (error) {
      console.error('Error fetching jobs by role:', error);
      throw error;
    }
  },

  // Fetch the role of a job seeker by ID
  getRoleByJobSeekerId: async (jobSeekerId) => {
    try {
      const [rows] = await db.execute('SELECT role FROM job_seekers WHERE id = ?', [jobSeekerId]);
      return rows[0]?.role || null; // Return the role if found
    } catch (error) {
      console.error('Error fetching role by job seeker ID:', error);
      throw error;
    }
  },

  // Fetch latest jobs (sorted by posted_date)
  getLatestJobs: async () => {
    try {
      const [jobs] = await db.execute('SELECT * FROM jobs ORDER BY posted_date DESC LIMIT 5');
      return jobs; // Return the latest jobs (limit to 5)
    } catch (error) {
      console.error('Error fetching latest jobs:', error);
      throw error;
    }
  }
};

module.exports = JobModel;
