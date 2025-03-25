const db = require('../config/db'); // Import the database connection

const application  = {
  // Save a job application
  create: async (data) => {
    const sql = `
      INSERT INTO job_application
      (job_seeker_id, job_id, cover_letter, cv_path, expected_salary, availability, relocation, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.jobSeekerId,
      data.jobId,
      data.coverLetter,
      data.cvPath,
      data.expectedSalary,
      data.availability,
      data.relocation,
      data.status || 'pending', 
    ];

    const [result] = await db.execute(sql, values); // Use db.execute for prepared statements
    return result;
  },


 // Get all applications by job seeker ID
 getAllByJobSeekerId: async (jobSeekerId) => {
    const sql = `
      SELECT ja.id AS application_id, ja.cover_letter, ja.cv_path, ja.expected_salary, ja.availability, ja.relocation,
             ja.application_date, ja.status, j.title AS job_title, j.id AS job_id, j.company_name, j.description AS job_description,
             c.image_path AS company_logo
      FROM job_application ja
      JOIN jobs j ON ja.job_id = j.id
      JOIN company c ON j.company_id = c.id
      WHERE ja.job_seeker_id = ?
      ORDER BY ja.application_date DESC
    `;
    const [rows] = await db.execute(sql, [jobSeekerId]);
    return rows;
  },
};


module.exports = application ;
