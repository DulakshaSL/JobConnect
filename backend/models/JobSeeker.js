const db = require('../config/db'); // Ensure this imports the connection pool

const JobSeeker = {
  create: async (data) => {
    const sql = `
      INSERT INTO jobseekers 
      (email, password, first_name, sur_name, phone_number, district, date_of_birth, age, gender_type, id_no,
       highest_qualification, qualification_field, university, graduation_year, years_of_experience, 
       previous_employer, job_role, job_field, job_type, field_of_interest, cv_filename, profile_picture) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.email, data.password, data.first_name, data.sur_name, data.phone_number, data.district,
      data.date_of_birth, data.age, data.gender_type, data.id_no, data.highest_qualification,, data.qualification_field, data.university, 
      data.graduation_year, data.years_of_experience, data.previous_employer, data.job_role,  data.job_field,
      data.job_type, data.field_of_interest, data.cv_path, data.profile_picture  || null ,
    ];
    
    const [result] = await db.execute(sql, values); // Use db.execute for prepared statements
    return result;
  },

  // Check if an email already exists
  findByEmail: async (email) => {
    const query = 'SELECT * FROM jobseekers WHERE email = ?';
    const [results] = await db.execute(query, [email]); // Use db.execute
    return results.length > 0 ? results[0] : null; // Return the job seeker if found
  }
};

module.exports = JobSeeker;



