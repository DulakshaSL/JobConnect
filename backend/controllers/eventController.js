// src/controllers/eventController.js
const Event = require('../models/eventModel');

// Fetch all events
async function getEvents(req, res) {
  try {
    const events = await Event.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
}

// Create a new event with image upload
async function createEvent(req, res) {
  const { title, description, date, time, location } = req.body;
  const image_path = req.file ? `/uploads/${req.file.filename}` : null; // Get the uploaded image path

  try {
    const eventId = await Event.createEvent(title, description, date, time, location, image_path);
    res.status(201).json({ message: 'Event created successfully', eventId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
}

module.exports = { getEvents, createEvent };
