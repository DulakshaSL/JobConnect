// controllers/ratingController.js
const Rating = require('../models/Rating');

const ratingController = {
  createRating: async (req, res) => {
    try {
      const { rating, comment } = req.body;
      const jobseekerId = req.user.id; // Assuming authenticated user

      if (!rating || !comment) {
        return res.status(400).json({ 
          success: false,
          message: 'Rating and comment are required' 
        });
      }

      const result = await Rating.create(jobseekerId, { rating, comment });
      
      res.status(201).json({
        success: true,
        message: 'Rating submitted successfully',
        data: { id: result.insertId }
      });
    } catch (error) {
      console.error('Error creating rating:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit rating'
      });
    }
  },

  getUserRatings: async (req, res) => {
    try {
      const jobseekerId = req.params.id;
      const ratings = await Rating.findByJobseekerId(jobseekerId);

      res.json({
        success: true,
        data: ratings
      });
    } catch (error) {
      console.error('Error fetching user ratings:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user ratings'
      });
    }
  },

  getRecentRatings: async (req, res) => {
    try {
      const ratings = await Rating.findAll();

      res.json({
        success: true,
        data: ratings
      });
    } catch (error) {
      console.error('Error fetching recent ratings:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch recent ratings'
      });
    }
  },

  getAverageRating: async (req, res) => {
    try {
      const average = await Rating.getAverageRating();

      res.json({
        success: true,
        data: { average: parseFloat(average).toFixed(1) }
      });
    } catch (error) {
      console.error('Error calculating average rating:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to calculate average rating'
      });
    }
  },

  deleteRating: async (req, res) => {
    try {
      const ratingId = req.params.id;
      const result = await Rating.delete(ratingId);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Rating not found'
        });
      }

      res.json({
        success: true,
        message: 'Rating deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting rating:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete rating'
      });
    }
  }
};

module.exports = ratingController;