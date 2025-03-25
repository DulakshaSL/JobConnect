import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Update to useNavigate
import '../styles/ApplicationTracker.css';

const ApplicationTracker = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/application/track", { withCredentials: true });
        if (response.data.success) {
          setApplications(response.data.applications);
          setFilteredApplications(response.data.applications);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleFilterChange = (e) => {
    const status = e.target.value;
    setStatusFilter(status);

    if (status === "All") {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(applications.filter(app => app.status === status));
    }
  };

  const handleViewJobPost = (jobId) => {
    navigate(`/job/${jobId}`);  // Use navigate to redirect
  };

  return (
    <div className="application-tracker-container">
      <h2>Your Job Applications</h2>

      <div className="filter-section">
        <label htmlFor="status-filter">Filter by Status:</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={handleFilterChange}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="applications-list">
        {filteredApplications.map((application) => (
          <div className="application-card" key={application.application_id}>
            <div className="company-logo">
              <img src={`http://localhost:5000/images/${application.company_logo}`} alt="Company Logo" />
            </div>
            <div className="application-details">
              <h3>{application.job_title}</h3>
              
              <p><strong></strong> {application.company_name}</p>
        
              <p><strong>Applied on </strong> {new Date(application.application_date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {application.status}</p>
              <button onClick={() => handleViewJobPost(application.job_id)}>View Job Post</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationTracker;
