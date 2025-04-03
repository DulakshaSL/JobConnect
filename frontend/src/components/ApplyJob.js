import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/ApplyJob.css';

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    coverLetter: "",
    expectedSalary: "",
    availability: "",
    relocation: ""
  });
  const [cv, setCv] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit");
        return;
      }
      setCv(file);
      setFileName(file.name);
      toast.success("File selected successfully");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!cv || !formData.coverLetter || !formData.expectedSalary || 
        !formData.availability || !formData.relocation) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("coverLetter", formData.coverLetter);
      formDataToSend.append("cv", cv);
      formDataToSend.append("jobId", jobId);
      formDataToSend.append("expectedSalary", formData.expectedSalary);
      formDataToSend.append("availability", formData.availability);
      formDataToSend.append("relocation", formData.relocation);

      const response = await axios.post(
        `http://localhost:5000/api/application/apply/${jobId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Application submitted successfully!");
        // Reset form
        setFormData({
          coverLetter: "",
          expectedSalary: "",
          availability: "",
          relocation: ""
        });
        setCv(null);
        setFileName("");
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/list');
        }, 2000);
      } else {
        toast.error(response.data.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="apply-job-container">
      <h2 className="apply-title">Job Application</h2>
      <form className="apply-form" onSubmit={handleSubmitApplication}>
        <div className="form-group">
          <label className="form-label">Cover Letter:</label>
          <textarea
            className="form-textarea"
            placeholder="Write your cover letter here..."
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Upload CV:</label>
          <div className="upload-wrapper">
            <div className="upload-container">
              <input
                type="file"
                className="upload-input"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                required
              />
              <div className="upload-icon">📄</div>
              <div className="upload-text">
                <strong>Click to upload</strong> or drag and drop
              </div>
              <div className="file-requirements">
                PDF or DOCX (Max. 5MB)
              </div>
              {fileName && <div className="file-name">{fileName}</div>}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Expected Salary:</label>
          <input
            className="form-input"
            id="expected"
            type="text"
            placeholder="e.g., $50,000 per year"
            name="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Availability to Start:</label>
          <input
            className="form-input"
            id="available"
            type="text"
            placeholder="e.g., Immediate, 2 weeks notice"
            name="availability"
            value={formData.availability}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Willing to Relocate:</label>
          <select
            className="form-select"
            name="relocation"
            value={formData.relocation}
            onChange={handleInputChange}
            required
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Maybe">Maybe</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default ApplyJob;