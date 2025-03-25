const application = require('../models/application');

exports.applyForJob = async (req, res) => {
  try {
    // Log the jobId to verify it's being captured correctly
    console.log("Job ID from URL:", req.params.jobId);  // This will log the jobId from the URL
    
    const jobId = req.params.jobId;  // Get job ID from URL parameters
    const { coverLetter, expectedSalary, availability, relocation } = req.body;
    const cvPath = req.file ? req.file.path : null;
    const jobSeekerId = req.session.jobSeekerId; // Get job seeker ID from session

    if (!jobSeekerId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Log other important details to verify everything is being passed correctly
    console.log("Cover Letter:", coverLetter);
    console.log("Expected Salary:", expectedSalary);
    console.log("Availability:", availability);
    console.log("Relocation:", relocation);
    console.log("CV Path:", cvPath);
    console.log("Job Seeker ID:", jobSeekerId);

    // Prepare application data
    const data = {
      jobSeekerId,
      jobId,
      coverLetter,
      cvPath,
      expectedSalary,
      availability,
      relocation,
      status: "pending", // Set default status as 'pending'

    };

    // Save the application
    await application.create(data); // Await the promise
    res.status(201).json({ success: true, message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ error: "Failed to apply for job." });
  }
};


exports.getApplications = async (req, res) => {
  try {
    const jobSeekerId = req.session.jobSeekerId; // Assuming the session contains the job seeker ID
    if (!jobSeekerId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const applications = await application.getAllByJobSeekerId(jobSeekerId);
    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ success: false, error: "Failed to fetch applications" });
  }
};


