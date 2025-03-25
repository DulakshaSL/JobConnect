import { useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams from React Router
import axios from "axios";
import '../styles/ApplyJob.css';

const ApplyJob = () => {
  const { jobId } = useParams(); // Get job ID from the URL
  const [coverLetter, setCoverLetter] = useState("");
  const [cv, setCv] = useState(null);
  const [expectedSalary, setExpectedSalary] = useState("");
  const [availability, setAvailability] = useState("");
  const [relocation, setRelocation] = useState("");

  const handleFileChange = (e) => {
    setCv(e.target.files[0]);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();

    // Check if the form is valid
    if (!cv || !coverLetter || !expectedSalary || !availability || !relocation) {
      alert("Please fill in all the fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("coverLetter", coverLetter);
      formData.append("cv", cv);
      formData.append("jobId", jobId); // Use jobId from the URL
      formData.append("expectedSalary", expectedSalary);
      formData.append("availability", availability);
      formData.append("relocation", relocation);

      const response = await axios.post(
        `http://localhost:5000/api/application/apply/${jobId}`, // Correctly include the job ID in the URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert("Application submitted successfully!");
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error.response?.data || error.message);
      alert("An error occurred while submitting the application.");
    }
  };

  return (
    <div className="apply-job-container">
      <h2 className="apply-title">Application</h2>
      <form className="apply-form" onSubmit={handleSubmitApplication}>
        <label className="form-label">Cover Letter:</label>
        <textarea
          className="form-textarea"
          placeholder="Write your cover letter here..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          required
        />

        <label className="form-label">Upload CV:</label>
        <input
          className="form-input"
          type="file"
          onChange={handleFileChange}
          required
        />

        <label className="form-label">Expected Salary:</label>
        <input
          className="form-input"
          type="text"
          placeholder="e.g., $50,000 per year"
          value={expectedSalary}
          onChange={(e) => setExpectedSalary(e.target.value)}
          required
        />

        <label className="form-label">Availability to Start:</label>
        <input
          className="form-input"
          type="text"
          placeholder="e.g., Immediate, 2 weeks notice"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          required
        />

        <label className="form-label">Willing to Relocate:</label>
        <select
          className="form-select"
          value={relocation}
          onChange={(e) => setRelocation(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Maybe">Maybe</option>
        </select>

        <button type="submit" className="submit-btn">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyJob;
