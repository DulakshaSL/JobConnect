const LatestJobsModel = require('../models/LatestJobsModel');

// Get latest jobs for the homepage
exports.getLatestJobs = async (req, res) => {
  try {
    const jobs = await LatestJobsModel.getLatest(); // Fetch the latest jobs
    res.status(200).json(jobs); // Return the jobs in the response
  } catch (error) {
    console.error('Error fetching latest jobs:', error);
    res.status(500).json({ message: 'Error fetching latest jobs', error });
  }
};

// Get a single job by ID
exports.getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await LatestJobsModel.getJobById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job); // Return the job details
  } catch (error) {
    console.error('Error fetching job by ID:', error);
    res.status(500).json({ message: 'Error fetching job details', error });
  }
};
