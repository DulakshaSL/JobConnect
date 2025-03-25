import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Received.css';

const Received = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployerJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employers/jobs', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setJobs(response.data?.jobs || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch your job listings');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployerJobs();
  }, []);

  if (loading) return <div className="loading">Loading your job listings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="jobs-table-container">
      <div className="table-header">
        <h2>Listings</h2>
        <Link to="/employer/jobs/create" className="create-job-btn">
          + Create New Job
        </Link>
      </div>

      {jobs.length > 0 ? (
        <table className="jobs-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Date Posted</th>
              <th>Applications</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={`job-${job.job_id}`}>
                <td>
                  <div className="job-title">
                    <h3>{job.title}</h3>
                    <span className="job-field">{job.field || 'General'}</span>
                  </div>
                </td>
                <td>{new Date(job.posted_date).toLocaleDateString()}</td>
                <td>
                  <span className={`app-count ${job.application_count ? 'has-applications' : ''}`}>
                    {job.application_count || 0}
                  </span>
                </td>
                <td>
                  <Link
                    to={`/employer/jobs/${job.job_id}/applicants`}
                    className="view-applicants-btn"
                  >
                    {job.application_count ? 'Manage' : 'View'}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-jobs">
          <p>You haven't posted any jobs yet.</p>
          <Link to="/employer/jobs/create" className="create-job-btn">
            Create Your First Job Posting
          </Link>
        </div>
      )}
    </div>
  );
};

export default Received;