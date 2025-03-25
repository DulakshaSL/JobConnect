const pool = require('../config/db'); // Import the MySQL connection pool

// Fetch all carousel items
exports.getCarouselItems = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM carousel');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching carousel items:', error);
    res.status(500).json({ error: 'Failed to fetch carousel items' });
  }
};
