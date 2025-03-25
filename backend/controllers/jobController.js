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
  const { jobId } = req.params; // Extract jobId from the request parameters
  try {
    const companyDetails = await Job.getCompanyByJobId(jobId); // Fetch company details using the job's company_id
    if (!companyDetails) {
      return res.status(404).json({ message: 'Company not found for this job' });
    }
    res.status(200).json(companyDetails); // Send the company details as a response
  } catch (error) {
    console.error("Error fetching company details:", error);
    res.status(500).json({ message: "Error fetching company details" });
  }
}

// Get jobs by role
async function getJobsByRole(req, res) {
  const { role } = req.params; // Extract role from query parameters
  try {
    const jobs = await Job.getJobsByRole(role);
    if (jobs.length === 0) {
      return res.status(404).json({ message: 'No jobs found for this role' });
    }
    res.status(200).json(jobs); // Send the filtered jobs as the response
  } catch (error) {
    console.error('Error fetching jobs by role:', error);
    res.status(500).json({ message: 'Error fetching jobs by role' });
  }
}



module.exports = { getJobs, getJobDetails, getCompanyDetailsByJobId, getJobsByRole  };
