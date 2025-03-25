// backend/controllers/mlController.js
const path = require('path');
const mlService = require('../services/mlService');

exports.predictJobRole = async (req, res) => {
  try {
    const file = req.files.cv; // Get the uploaded CV file
    const filePath = path.join(__dirname, '..', 'uploads', file.name);
    
    // Save the uploaded file
    file.mv(filePath, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'File upload failed' });
      }

      // Get the predicted job role
      const predictedRole = await mlService.makePrediction(filePath);

      // Respond with the predicted role
      res.json({ predictedRole: predictedRole[0] });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error in prediction' });
  }
};
