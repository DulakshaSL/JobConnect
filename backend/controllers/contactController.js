const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

const contactController = {
    submitContact: async (req, res) => {
      try {
        const { name, email, subject, message } = req.body;
  
        // Save to database with default 'pending' status
        const newContact = await Contact.create({
          name,
          email,
          subject,
          message,
          status: 'pending'
        });
  
        res.status(201).json({
          success: true,
          message: 'Your message has been submitted and is pending review',
          data: {
            contactId: newContact.insertId,
            status: 'pending'
          }
        });
      } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({
          success: false,
          message: 'Failed to submit contact form',
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }
    },

  // Add these new methods for status management
  getAllContacts: async (req, res) => {
    try {
      const contacts = await Contact.findAll();
      res.json({ success: true, data: contacts });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch contacts' });
    }
  },

  updateContactStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!['pending', 'in_progress', 'resolved'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status' });
      }

      await Contact.updateStatus(id, status);
      res.json({ success: true, message: 'Status updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to update status' });
    }
  }
};

module.exports = contactController;