const db = require('../config/db');

const Employer = {
  // Create an employer account and a company linked to the employer
  createWithCompany: async (employerData, companyData) => {
    const connection = await db.getConnection(); // Get a connection to use transactions
    try {
      // Start a transaction
      await connection.beginTransaction();

      // Step 1: Insert into the employer table
      const employerSql = `INSERT INTO employer (email, password, phone_number) VALUES (?, ?, ?)`;
      const employerValues = [employerData.email, employerData.password, employerData.phone_number];
      const [employerResult] = await connection.execute(employerSql, employerValues);

      // Get the employer's ID
      const employerId = employerResult.insertId;

      // Step 2: Insert into the company table, linking it to the employer
      const companySql = `
        INSERT INTO company (employer_id, name, company_overview, image_path, no_of_jobs, registration_id) 
        VALUES (?, ?, ?, ?, 0, ?)
      `;
      const companyValues = [
        employerId, companyData.name, companyData.company_overview, companyData.image_path, companyData.registration_id
      ];
      const [companyResult] = await connection.execute(companySql, companyValues);

      // Commit the transaction
      await connection.commit();

      // Return both the employer and company IDs
      return { success: true, employerId, companyId: companyResult.insertId };
    } catch (error) {
      // Rollback if an error occurs
      await connection.rollback();
      console.error('Error during transaction:', error);
      return { success: false, message: 'Registration failed.' };
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  },
// Find employer by email with company information
findByEmail: async (email) => {
  const sql = `
    SELECT e.*, c.id AS company_id 
    FROM employer e
    LEFT JOIN company c ON e.employer_id = c.employer_id
    WHERE e.email = ?
  `;
  const [results] = await db.execute(sql, [email]);
  return results.length > 0 ? results[0] : null;
},
  // Get the number of jobs posted by the employer
  getNumberOfJobs: async (employerId) => {
    const sql = `SELECT COUNT(*) AS job_count FROM jobs WHERE company_id IN (SELECT id FROM company WHERE employer_id = ?)`;
    const [results] = await db.execute(sql, [employerId]);
    return results.length > 0 ? results[0].job_count : 0;
  },

  // Get the number of applicants for each job posted by the employer
  getApplicantsForJobs: async (employerId) => {
    const sql = `
      SELECT job_id, title, COUNT(*) AS applicant_count
      FROM job_application
      JOIN jobs ON job_application.job_id = jobs.id
      WHERE jobs.company_id IN (SELECT id FROM company WHERE employer_id = ?)
      GROUP BY job_application.job_id
    `;
    const [results] = await db.execute(sql, [employerId]);
    return results;
  },

  // Get all applicants for a specific job
  getJobApplicants: async (jobId) => {
    const sql = `
      SELECT jobseekers.id, jobseekers.first_name, jobseekers.sur_name, jobseekers.email, job_application.cover_letter, job_application.cv_path
      FROM jobseekers
      JOIN job_application ON jobseekers.id = job_application.job_seeker_id
      WHERE job_application.job_id = ?
    `;
    const [results] = await db.execute(sql, [jobId]);
    return results;
  },

  // Update the application status (shortlist or reject)
  updateApplicationStatus: async (applicationId, status) => {
    const sql = 'UPDATE job_application SET status = ? WHERE id = ?';
    try {
      await db.execute(sql, [status, applicationId]);
      return { success: true, message: `Application ${status} successfully` };
    } catch (error) {
      console.error('Error updating application status:', error);
      return { success: false, message: 'Failed to update application status' };
    }
  },

  // Create a new job
createJob: async (jobData) => {
  const sql = `
    INSERT INTO jobs (
      company_id, company_name, title, role, image_path, type, field, district, 
      description, salary, days_left, min_experience, highest_qualification, 
      qualification_field, preferred_gender, min_age, max_age, max_experience, 
      responsibilities, qualifications, how_to_apply, posted_date, posted_by, job_poster
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  try {
    await db.execute(sql, [
      jobData.company_id, 
      jobData.company_name, 
      jobData.title, 
      jobData.role || null, 
      jobData.image_path || null, 
      jobData.type, 
      jobData.field, 
      jobData.district, 
      jobData.description, 
      jobData.salary, 
      jobData.days_left, 
      jobData.min_experience, 
      jobData.highest_qualification, 
      jobData.qualification_field || null, 
      jobData.preferred_gender || null, 
      jobData.min_age || null, 
      jobData.max_age || null, 
      jobData.max_experience || null, 
      jobData.responsibilities, 
      jobData.qualifications, 
      jobData.how_to_apply, 
      jobData.posted_date || new Date(),  // Default to current date if not provided
      jobData.posted_by, 
      jobData.job_poster || null
    ]);
    return { success: true, message: 'Job created successfully' };
  } catch (error) {
    console.error('Error creating job:', error);
    return { 
      success: false, 
      message: error.sqlMessage || 'Failed to create job',
      errorDetails: error
    };
  }
},

  // Update an existing job
  updateJob: async (jobId, jobData) => {
    const sql = `
      UPDATE jobs
      SET title = ?, role = ?, image_path = ?, type = ?, field = ?, district = ?, description = ?, salary = ?, days_left = ?, 
      min_experience = ?, highest_qualification = ?, qualification_field = ?, preferred_gender = ?, min_age = ?, max_age = ?, 
      max_experience = ?, responsibilities = ?, qualifications = ?, how_to_apply = ?, job_poster = ?
      WHERE id = ?
    `;
    try {
      await db.execute(sql, [
        jobData.title, jobData.role, jobData.image_path, jobData.type, jobData.field, jobData.district, jobData.description, 
        jobData.salary, jobData.days_left, jobData.min_experience, jobData.highest_qualification, jobData.qualification_field, 
        jobData.preferred_gender, jobData.min_age, jobData.max_age, jobData.max_experience, jobData.responsibilities, 
        jobData.qualifications, jobData.how_to_apply, jobData.job_poster, jobId
      ]);
      return { success: true, message: 'Job updated successfully' };
    } catch (error) {
      console.error('Error updating job:', error);
      return { success: false, message: 'Failed to update job' };
    }
  },

  // Delete a job
  deleteJob: async (jobId) => {
    const sql = 'DELETE FROM jobs WHERE id = ?';
    try {
      await db.execute(sql, [jobId]);
      return { success: true, message: 'Job deleted successfully' };
    } catch (error) {
      console.error('Error deleting job:', error);
      return { success: false, message: 'Failed to delete job' };
    }
  },


  // Fetch all jobs posted by the employer
  getEmployerJobs: async (employerId) => {
    try {
      const sql = `
        SELECT j.*
        FROM jobs j
        JOIN company c ON j.company_id = c.id
        WHERE c.employer_id = ?
      `;
      const [results] = await db.execute(sql, [employerId]);
      return results;
    } catch (error) {
      console.error('Error fetching employer jobs:', error);
      throw error;
    }
  }


};

module.exports = Employer;
