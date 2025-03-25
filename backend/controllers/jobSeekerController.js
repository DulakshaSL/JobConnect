const bcrypt = require('bcrypt');
const JobSeeker = require('../models/JobSeeker');

// Create a new job seeker
exports.createJobSeeker = async (req, res) => {
  try {
    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    // Prepare job seeker data, including the hashed password
    const data = {
      ...req.body,
      password: hashedPassword, // replace the plain password with hashed
      cv_path: req.file ? req.file.path : null,
    };

    await JobSeeker.create(data); // Await the promise
    res.status(201).json({ message: 'Job seeker registered successfully!' });
  } catch (error) {
    console.error('Error during job seeker registration:', error);
    res.status(500).json({ error: 'Failed to register job seeker.' });
  }
};

// Check if an email already exists
exports.checkEmail = async (req, res) => {
  const { email } = req.body; // Extract the email from the request body

  try {
    const user = await JobSeeker.findByEmail(email);
    if (user) {
      return res.status(409).json({ message: 'Email already exists.' });
    }
    res.status(200).json({ message: 'Email is available.' });
  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json({ error: 'Database query failed.' });
  }
};

// Login job seeker
exports.loginJobSeeker = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists in the database
    const jobSeeker = await JobSeeker.findByEmail(email);
    if (!jobSeeker) {
      return res.status(401).json({ message: 'Invalid emai2l or password.' });
    }

    // Compare the provided password with the stored hashed password
    const match = await bcrypt.compare(password, jobSeeker.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email2 or password.' });
    }

    // Successful login
    req.session.jobSeekerId = jobSeeker.id; // Save to session
    req.session.jobSeekerEmail = jobSeeker.email; // Save email to session
    res.status(200).json({ message: 'Login successful!', jobSeekerId: jobSeeker.id });
    console.log('User ID from session:', req.session.jobSeekerId);

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Failed to log in.' });
  }
};
