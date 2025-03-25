import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Received from './Received';
import '../styles/EmployerDashboard.css'; 


const EmployerDashboardPage = () => {
  const [jobCount, setJobCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobCount = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/employers/jobs/count',
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        setJobCount(response.data.count);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load dashboard data');
        console.error('Error fetching job count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobCount();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="employer-dashboard">
      <header className="dashboard-header">
        <h1>Employer Dashboard</h1>
        <div className="stats">
          <div className="stat-card">
            <h3>Jobs Posted</h3>
            <p className="count">{jobCount}</p>
          </div>
        </div>
      </header>

      <div className="dashboard-actions">
        <Link to="/employer/jobs/create" className="primary-btn">
          Create New Job Posting
        </Link>
      </div>

      <section className="job-listings-section">
        <h2>Your Job Listings</h2>
        <Received />
      </section>
    </div>
  );
};

export default EmployerDashboardPage;