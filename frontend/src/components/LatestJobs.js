import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/LatestJobs.css';

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const jobsPerPage = 3; // Changed to 3 cards per row

  useEffect(() => {
    const fetchLatestJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/latest-jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching latest jobs:', error);
      }
    };

    fetchLatestJobs();
  }, []);

  const displayedJobs = jobs.slice(currentIndex, currentIndex + jobsPerPage);

  const handleNext = () => {
    if (currentIndex + jobsPerPage < jobs.length) {
      setCurrentIndex(currentIndex + jobsPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - jobsPerPage >= 0) {
      setCurrentIndex(currentIndex - jobsPerPage);
    }
  };

  return (
    <div className="latest-jobs-container dark-theme">
      <h2>Latest Jobs</h2>

      <div className="jobs-wrapper">
        <button 
          className="arrow-btn" 
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={32} />
        </button>

        <div className="jobs-card-container">
          {displayedJobs.length === 0 ? (
            <p>No latest jobs available</p>
          ) : (
            displayedJobs.map((job) => (
              <div className="job-card" key={job.id}>
                <img 
                  src={`http://localhost:5000/images/${job.image_path}`} 
                  alt={job.company_name} 
                  className="job-image"
                />
                <div className="job-card-content">
                  <h3>{job.title}</h3>
                  <p className="company">{job.company_name}</p>
         
                  <a href={`/jobs/${job.id}`} className="btn-apply">
                    View Details
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        <button 
          className="arrow-btn" 
          onClick={handleNext}
          disabled={currentIndex + jobsPerPage >= jobs.length}
        >
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="view-all">
        <a href="/list" className="btn-view-all">
          View All Jobs
        </a>
      </div>
    </div>
  );
};

export default LatestJobs;