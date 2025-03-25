const bcrypt = require('bcrypt');
const Employer = require('../models/employer');

// Register a new employer and their company
exports.registerEmployer = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.email || !req.body.password || !req.body.company_name) {
      return res.status(400).json({ 
        error: 'Email, password, and company name are required fields' 
      });
    }

    // Hash the employer's password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Prepare employer data with null checks
    const employerData = {
      email: req.body.email,
      password: hashedPassword,
      phone_number: req.body.phone_number || null // Convert undefined to null
    };

    // Prepare company data with null checks
    const companyData = {
      name: req.body.company_name,
      company_overview: req.body.company_overview || null,
      image_path: req.body.image_path || null,
      registration_id: req.body.registration_id || null
    };

    // Create the employer and the company, and link them
    const result = await Employer.createWithCompany(employerData, companyData);

    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }

    // Respond with a success message
    res.status(201).json({ 
      message: 'Employer and company registered successfully!',
      employerId: result.employerId,
      companyId: result.companyId
    });

  } catch (error) {
    console.error('Error during employer registration:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to register employer and company.' 
    });
  }
};

// Check if an employer email already exists
exports.checkEmployerEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const employer = await Employer.findByEmail(email);
    if (employer) {
      return res.status(409).json({ message: 'Email already exists.' });
    }
    res.status(200).json({ message: 'Email is available.' });
  } catch (error) {
    console.error('Error checking employer email:', error);
    res.status(500).json({ error: 'Database query failed.' });
  }
};

// Employer login
exports.loginEmployer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the employer by email with company info
    const employer = await Employer.findByEmail(email);
    if (!employer) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, employer.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Successful login - store session data
    req.session.employerId = employer.employer_id;
    req.session.employerEmail = employer.email;
    req.session.companyId = employer.company_id; // Now available from the query

    res.status(200).json({ 
      message: 'Login successful!', 
      employerId: employer.employer_id,
      companyId: employer.company_id 
    });

  } catch (error) {
    console.error('Error during employer login:', error);
    res.status(500).json({ error: 'Failed to log in.' });
  }
};


// Get the number of jobs posted by the employer
exports.getNumberOfJobs = async (req, res) => {
  const employerId = req.session.employerId;

  if (!employerId) {
    return res.status(401).json({ message: 'Employer not logged in.' });
  }

  try {
    const jobCount = await Employer.getNumberOfJobs(employerId);
    res.status(200).json({ jobCount });
  } catch (error) {
    console.error('Error getting number of jobs:', error);
    res.status(500).json({ error: 'Failed to fetch job count.' });
  }
};

// Get the number of applicants for each job posted by the employer
exports.getApplicantsForJobs = async (req, res) => {
  const employerId = req.session.employerId;

  if (!employerId) {
    return res.status(401).json({ message: 'Employer not logged in.' });
  }

  try {
    const applicants = await Employer.getApplicantsForJobs(employerId);
    res.status(200).json({ applicants });
  } catch (error) {
    console.error('Error getting applicants:', error);
    res.status(500).json({ error: 'Failed to fetch applicants.' });
  }
};

// Get all applicants for a specific job
exports.getJobApplicants = async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const applicants = await Employer.getJobApplicants(jobId);
    res.status(200).json({ applicants });
  } catch (error) {
    console.error('Error getting job applicants:', error);
    res.status(500).json({ error: 'Failed to fetch job applicants.' });
  }
};

// Update application status (shortlist or reject)
exports.updateApplicationStatus = async (req, res) => {
  const { applicationId, status } = req.body;

  try {
    const result = await Employer.updateApplicationStatus(applicationId, status);
    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ error: 'Failed to update application status.' });
  }
};

// Create a new job
exports.createJob = async (req, res) => {
  const employerId = req.session.employerId;

  if (!employerId) {
    return res.status(401).json({ message: 'Employer not logged in.' });
  }

  const jobData = {
    company_id: req.body.company_id, // Linked to the employer's company
    company_name: req.body.company_name,
    title: req.body.title,
    role: req.body.role,
    image_path: req.body.image_path || null,
    type: req.body.type,
    field: req.body.field,
    district: req.body.district,
    description: req.body.description,
    salary: req.body.salary,
    days_left: req.body.days_left,
    min_experience: req.body.min_experience,
    highest_qualification: req.body.highest_qualification,
    qualification_field: req.body.qualification_field,
    preferred_gender: req.body.preferred_gender,
    min_age: req.body.min_age,
    max_age: req.body.max_age,
    max_experience: req.body.max_experience,
    responsibilities: req.body.responsibilities,
    qualifications: req.body.qualifications,
    how_to_apply: req.body.how_to_apply,
    posted_date: new Date(),
    posted_by: employerId , // Employer who posted the job
    job_poster: req.body.job_poster 
  };

  try {
    const result = await Employer.createJob(jobData);
    if (result.success) {
      res.status(201).json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Failed to create job.' });
  }
};

// Update an existing job
exports.updateJob = async (req, res) => {
  const employerId = req.session.employerId;

  if (!employerId) {
    return res.status(401).json({ message: 'Employer not logged in.' });
  }

  const { jobId } = req.params;
  const jobData = req.body;

  try {
    const result = await Employer.updateJob(jobId, jobData);
    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Failed to update job.' });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  const employerId = req.session.employerId;

  if (!employerId) {
    return res.status(401).json({ message: 'Employer not logged in.' });
  }

  const { jobId } = req.params;

  try {
    const result = await Employer.deleteJob(jobId);
    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Failed to delete job.' });
  }
};

exports.getEmployerJobs = async (req, res) => {
  try {
    const employerId = req.session.employerId; // Get employer ID from session

    if (!employerId) {
      return res.status(401).json({ message: 'Unauthorized: Please log in' });
    }

    const jobs = await Employer.getEmployerJobs(employerId);

    res.status(200).json({ jobs });

  } catch (error) {
    console.error('Error fetching employer jobs:', error);
    res.status(500).json({ message: 'Failed to retrieve jobs' });
  }
};