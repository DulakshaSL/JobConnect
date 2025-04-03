import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/LatestJobs.css';

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const jobsPerPage = 5;
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  // Pre-calculate total pages and current page
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const currentPage = Math.floor(currentIndex / jobsPerPage) + 1;
  const displayedJobs = jobs.slice(currentIndex, currentIndex + jobsPerPage);

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
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Auto-slide with requestAnimationFrame for smoother animation
  useEffect(() => {
    if (jobs.length === 0 || isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      handleNext();
    }, 3000); // Reduced to 3 seconds for faster cycling

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [jobs, isHovered, currentIndex]);

  const handleTransition = (direction) => {
    setIsAnimating(true);
    setTimeout(() => {
      if (direction === 'next') {
        const nextIndex = (currentIndex + jobsPerPage) % jobs.length;
        setCurrentIndex(nextIndex);
      } else {
        const prevIndex = (currentIndex - jobsPerPage + jobs.length) % jobs.length;
        setCurrentIndex(prevIndex);
      }
      setIsAnimating(false);
    }, 300); // Match this duration with CSS transition duration
  };

  const handleNext = () => {
    handleTransition('next');
  };

  const handlePrevious = () => {
    handleTransition('prev');
  };

  const goToPage = (pageIndex) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(pageIndex * jobsPerPage);
      setIsAnimating(false);
    }, 300);
  };

  const handleCardClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div className="latest-jobs-container dark-theme">
      <h2>Latest Jobs</h2>

      <div 
        className="jobs-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button 
          className="arrow-btn" 
          onClick={handlePrevious}
          disabled={jobs.length <= jobsPerPage || isAnimating}
          aria-label="Previous jobs"
        >
          <ChevronLeft size={32} />
        </button>

        <div className="jobs-card-container" ref={sliderRef}>
          {displayedJobs.length === 0 ? (
            <p>No latest jobs available</p>
          ) : (
            <div className={`jobs-slider ${isAnimating ? 'fade-out' : 'fade-in'}`}>
              {displayedJobs.map((job) => (
                <div 
                  className="job-card" 
                  key={job.id}
                  onClick={() => handleCardClick(job.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleCardClick(job.id)}
                >
                  <img 
                    src={`http://localhost:5000/images/${job.image_path}`} 
                    alt={job.company_name} 
                    className="job-image"
                    loading="lazy"
                  />
                  <div className="job-card-content">
                    <h3>{job.title}</h3>
                    <p className="company">{job.company_name}</p>
                    {job.days_left && (
                      <p className="days-left">{job.days_left} days left</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          className="arrow-btn" 
          onClick={handleNext}
          disabled={jobs.length <= jobsPerPage || isAnimating}
          aria-label="Next jobs"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {totalPages > 1 && (
        <div className="progress-indicators">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentPage - 1 ? 'active' : ''}`}
              onClick={() => goToPage(index)}
              aria-label={`Go to page ${index + 1}`}
              disabled={isAnimating}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestJobs;