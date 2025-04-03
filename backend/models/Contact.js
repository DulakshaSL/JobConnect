const pool = require('../config/db');

const Contact = {
  create: async (contactData) => {
    const query = `
      INSERT INTO contacts (name, email, subject, message, status)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      contactData.name,
      contactData.email,
      contactData.subject,
      contactData.message,
      'pending' // Default status
    ];

    const [result] = await pool.execute(query, values);
    return result;
  },

  findAll: async () => {
    const [results] = await pool.execute(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );
    return results;
  },

  updateStatus: async (id, status) => {
    const [result] = await pool.execute(
      'UPDATE contacts SET status = ? WHERE id = ?',
      [status, id]
    );
    return result;
  }
};

module.exports = Contact;