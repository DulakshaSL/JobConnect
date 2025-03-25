const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'jobconnectdb',
  waitForConnections: true,
  connectionLimit: 10, // Maximum number of connections to create at once
  queueLimit: 0 // Unlimited queueing
});

async function connectDB() {
  try {
    // Test the connection
    await pool.getConnection();
    console.log('Connected to MySQL database.');
  } catch (error) {
    console.error('Database connection failed:', error.stack);
    throw error;
  }
}

// Call the connection function to initialize the pool
connectDB();

// Export the pool for use in other files
module.exports = pool;

