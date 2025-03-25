const pool = require('../config/db'); // Import the MySQL connection pool

// Create an event
async function createEvent(eventData) {
  const { title, description, date, time, location } = eventData;
  try {
    const [result] = await pool.query(
    //   'INSERT INTO events (title, description, date, time, location, image_path) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, date, time, location]
    );
    return result;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
}

// Fetch all events
async function getAllEvents() {
  try {
    const [events] = await pool.query('SELECT * FROM events ORDER BY date DESC');
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

// Fetch event by ID
async function getEventById(id) {
  try {
    const [event] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);
    return event[0];
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
}

// Update event details
async function updateEvent(id, eventData) {
  const { title, description, date, time, location } = eventData;
  try {
    const [result] = await pool.query(
      'UPDATE events SET title = ?, description = ?, date = ?, time = ?, location = ? WHERE id = ?',
      [title, description, date, time, location, id]
    );
    return result;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
}

// Delete an event
async function deleteEvent(id) {
  try {
    const [result] = await pool.query('DELETE FROM events WHERE id = ?', [id]);
    return result;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
