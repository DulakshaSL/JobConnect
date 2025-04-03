// models/Rating.js
const db = require('../config/db');

const Rating = {
  create: async (jobseekerId, ratingData) => {
    const sql = `
      INSERT INTO ratings (jobseeker_id, rating, comment)
      VALUES (?, ?, ?)
    `;
    const values = [jobseekerId, ratingData.rating, ratingData.comment];
    
    const [result] = await db.execute(sql, values);
    return result;
  },

  findByJobseekerId: async (jobseekerId) => {
    const query = `
      SELECT r.*, j.first_name, j.sur_name, j.profile_picture 
      FROM ratings r
      JOIN jobseekers j ON r.jobseeker_id = j.id
      WHERE r.jobseeker_id = ?
      ORDER BY r.created_at DESC
    `;
    const [results] = await db.execute(query, [jobseekerId]);
    return results;
  },

  findAll: async () => {
    const query = `
      SELECT r.*, j.first_name, j.sur_name, j.profile_picture 
      FROM ratings r
      JOIN jobseekers j ON r.jobseeker_id = j.id
      ORDER BY r.created_at DESC
      LIMIT 5
    `;
    const [results] = await db.execute(query);
    return results;
  },

  getAverageRating: async () => {
    const query = `SELECT AVG(rating) as average FROM ratings`;
    const [results] = await db.execute(query);
    return results[0].average || 0;
  },

  delete: async (ratingId) => {
    const query = `DELETE FROM ratings WHERE id = ?`;
    const [result] = await db.execute(query, [ratingId]);
    return result;
  }
};

module.exports = Rating;