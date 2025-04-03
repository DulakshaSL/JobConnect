import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import JobCard from '../components/JobCard';
import '../styles/FieldJobs.css';

const FieldJobs = () => {
  const { field } = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobsByField = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/field/${field}`);
        setJobs(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobsByField();
  }, [field]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="field-jobs-container">
      <h1 className="field-title">Jobs in {decodeURIComponent(field)}</h1>
      <div className="jobs-list">
        {jobs.length > 0 ? (
          jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <p className="no-jobs">No jobs found in this field</p>
        )}
      </div>
    </div>
  );
};

export default FieldJobs;