const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const jobSeekerRoutes = require('./routes/jobSeekerRoutes');
const carouselRoutes = require('./routes/carouselRoutes');
const jobRoutes = require('./routes/jobRoutes');
const communityRoutes = require('./routes/communityRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const profileRoutes = require("./routes/profileRoutes");
const latestJobsRoutes = require('./routes/latestJobsRoutes'); 
// Import your new routes
const companyRoutes = require('./routes/companyRoutes');
// Import your new event routes
const eventRoutes = require('./routes/eventRoutes');
const employerRoutes = require('./routes/employerRoutes');
const app = express();
const PORT = 5000;

// CORS middleware configuration
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true, // Allows credentials like cookies with requests
}));

// Session configuration should come before routes to make sessions available
app.use(session({
  secret: 'jobconnectsecret', // Change this to a more secure secret in production
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true if using HTTPS in production
    httpOnly: true, // Prevents client-side access to the cookie
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Use the new route
app.use('/api', companyRoutes);
// Use the event routes
app.use('/api', eventRoutes);

// Static file serving
app.use('/uploads', express.static('uploads')); // Serve uploaded CVs
app.use('/images', express.static('public/images')); // Serve images

// Register routes
app.use('/api/jobseekers', jobSeekerRoutes);
app.use('/api/carousels', carouselRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api/community', communityRoutes); // Now uses `/api/community` path for community routes
app.use("/api", profileRoutes);
app.use("/api/employers", employerRoutes);
// Routes
app.use('/api/latest-jobs', latestJobsRoutes); // Use the latest jobs routes

// In your backend (Express server)
app.get('/api/job-seeker-id', (req, res) => {
  if (req.session.jobSeekerId) {
    res.json({ jobSeekerId: req.session.jobSeekerId });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
