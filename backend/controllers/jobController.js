const Job = require('../models/Job');

// Get all jobs
async function getJobs(req, res) {
  try {
    const jobs = await Job.getAllJobs();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
}

// Get job details by ID
async function getJobDetails(req, res) {
  try {
    const { id } = req.params;
    const job = await Job.getJobById(id);
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job details', error });
  }
}

// Get company information by job ID
async function getCompanyDetailsByJobId(req, res) {
  const { jobId } = req.params;
  try {
    const companyDetails = await Job.getCompanyByJobId(jobId);
    if (!companyDetails) {
      return res.status(404).json({ message: 'Company not found for this job' });
    }
    res.status(200).json(companyDetails);
  } catch (error) {
    console.error("Error fetching company details:", error);
    res.status(500).json({ message: "Error fetching company details" });
  }
}

// Get jobs by role
async function getJobsByRole(req, res) {
  const { role } = req.params;
  try {
    const jobs = await Job.getJobsByRole(role);
    if (jobs.length === 0) {
      return res.status(404).json({ message: 'No jobs found for this role' });
    }
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs by role:', error);
    res.status(500).json({ message: 'Error fetching jobs by role' });
  }
}

// Get all job fields with counts
async function getJobFieldsWithCounts(req, res) {
  try {
    const fields = await Job.getJobFieldsWithCounts();
    res.status(200).json(fields);
  } catch (error) {
    console.error('Error fetching job fields:', error);
    res.status(500).json({ message: 'Error fetching job fields' });
  }
}

// Get jobs by field
async function getJobsByField(req, res) {
  const { field } = req.params;
  try {
    const jobs = await Job.getJobsByField(field);
    if (jobs.length === 0) {
      return res.status(404).json({ message: `No jobs found in ${field} field` });
    }
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs by field:', error);
    res.status(500).json({ message: 'Error fetching jobs by field' });
  }
}

module.exports = {
  getJobs,
  getJobDetails,
  getCompanyDetailsByJobId,
  getJobsByRole,
  getJobFieldsWithCounts,
  getJobsByField
};