import React, { useState, useEffect } from 'react';
import { Link, useParams  } from 'react-router-dom';
import '../styles/JobList.css';
import axios from 'axios';
import searchIcon from '../assets/searching.png';
import locationIcon from '../assets/down-arrow.png';
import AIIcon from '../assets/images/ai.png';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const JobList = () => {
  const { jobType } = useParams(); // Get the job type from the URL
  const [jobs, setJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [isAIRecommended, setIsAIRecommended] = useState(false);
  const [filters, setFilters] = useState({
    jobType: '',
    field: '',
    location: '',
    selectedLocation: [],
    searchQuery: '',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 5;
 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);
  
 
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
    setCurrentPage(1);
  };

  const handleLocationChange = (location) => {
    setFilters((prevFilters) => {
      const selectedLocations = prevFilters.selectedLocation.includes(location)
        ? prevFilters.selectedLocation.filter((loc) => loc !== location)
        : [...prevFilters.selectedLocation, location];
      
      if (location === 'Select All') {
        return { ...prevFilters, selectedLocation: [] };
      }
      
      const allLocations = ['Colombo', 'Kaluthara', 'Gampaha'];
      const isSelectAllChecked = selectedLocations.length === allLocations.length;

      return { 
        ...prevFilters, 
        selectedLocation: isSelectAllChecked ? [] : selectedLocations 
      };
    });
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      searchQuery: e.target.value.trim(),
    });
    setCurrentPage(1);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  
  
  
  const handleAIRecommendation = async () => {
    try {
      // Fetch the jobSeekerId from the backend
      const sessionResponse = await axios.get('http://localhost:5000/api/job-seeker-id', {
        withCredentials: true, // Ensure cookies are sent with the request
      });
  
      const jobSeekerId = sessionResponse.data.jobSeekerId;
  
      if (!jobSeekerId) {
        console.error('Job Seeker ID is not available');
        return;
      }
  
      // Fetch the CV path for the job seeker
      const cvResponse = await axios.get(`http://localhost:8000/cv/${jobSeekerId}`);
      const cvPath = cvResponse.data.cv_path;
  
      // Directly send the CV path to the backend for prediction
      const predictionResponse = await axios.post('http://localhost:8000/predict', null, {
        params: { cv_path: cvPath },
      });
  
      const predictedRole = predictionResponse.data.predicted_job_role;
      console.log('Predicted role:', predictedRole); // Debugging line
  
      // Fetch recommended jobs based on the predicted role
      const jobsResponse = await axios.get(`http://localhost:5000/api/jobs/role/${predictedRole}`);
  
      console.log('Fetched jobs:', jobsResponse.data); // Debugging line
  
      setRecommendedJobs(jobsResponse.data);
      setIsAIRecommended(true);
  
    } catch (error) {
      console.error('Error fetching AI recommendations:', error);
    }
  };
  
  const normalizeJobType = (type) => {
    return type ? type.replace(/-/g, ' ').toLowerCase() : '';
  };
  
  const filteredJobs = jobs.filter((job) => {
    const searchQueryLower = filters.searchQuery.toLowerCase();
    
    
    const normalizedJobType = normalizeJobType(jobType);
  
    const matchesJobType = 
      (!jobType || (job.type && normalizeJobType(job.type) === normalizedJobType)) &&
      (!filters.jobType || (job.type && normalizeJobType(job.type) === normalizeJobType(filters.jobType)));
    
    const matchesField = !filters.field || (job.field && job.field.toLowerCase() === filters.field.toLowerCase());
  
    const matchesLocation =
      (!filters.location || (job.district && job.district.toLowerCase().includes(filters.location.toLowerCase()))) &&
      (filters.selectedLocation.length === 0 || filters.selectedLocation.some(
        (location) => job.location && job.location.toLowerCase() === location.toLowerCase()
      ));
  
    const matchesSearchQuery =
      !searchQueryLower ||
      (job.title && job.title.toLowerCase().includes(searchQueryLower)) ||
      (job.company_name && job.company_name.toLowerCase().includes(searchQueryLower)) ||
      (job.type && job.type.toLowerCase().includes(searchQueryLower)) ||
      (job.field && job.field.toLowerCase().includes(searchQueryLower)) ||
      (job.district && job.district.toLowerCase().includes(searchQueryLower));
  
    return matchesJobType && matchesField && matchesLocation && matchesSearchQuery;
  });
  

  const displayedJobs = isAIRecommended ? recommendedJobs : filteredJobs;
  const totalPages = Math.ceil(displayedJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = displayedJobs.slice((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='job-list-main'>
    <div className='list-main'>
      <div className="job-search-bar">
        <input
          type="text"
          className="full-size-search"
          placeholder="Search for jobs, companies, or locations..."
          onChange={handleSearchChange}
          style={{ backgroundImage: `url(${searchIcon})` }}
        />
        <div className="multi-select" onClick={toggleDropdown}>
          <div className="selected-options">
            {filters.selectedLocation.length > 0
              ? filters.selectedLocation.includes('Select All')
                ? 'All Locations Selected'
                : filters.selectedLocation.join(', ')
              : 'Locations'}
            <img src={locationIcon} alt="Location" className="location-icon" />
          </div>
          {isDropdownOpen && (
            <div className="options-dropdown">
              <div className="option-item" onClick={() => handleLocationChange('Select All')}>
                <input type="checkbox" checked={filters.selectedLocation.includes('Select All')} readOnly />
                All
              </div>
              {['Colombo', 'Kaluthara', 'Gampaha'].map((location) => (
                <div key={location} className="option-item" onClick={() => handleLocationChange(location)}>
                  <input type="checkbox" checked={filters.selectedLocation.includes(location)} readOnly />
                  {location}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="job-list-container">
        <aside className="sidebar">
          <h3>Filter Jobs</h3>
          <label>
            Job Type
            <select name="jobType" onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Freelance">Freelance</option>
            </select>
          </label>
          <label>
            Field
            <select name="field" onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
            </select>
          </label>
          <label>
            Location
            <input className='field-location' type="text" name="location" placeholder="Enter location" onChange={handleFilterChange} />
          </label>
          <button className='ai-button' onClick={handleAIRecommendation}>
        <img src={AIIcon} alt="AI" className="ai-icon" />
        AI Recommendation
      </button>
        </aside>

        <div className="job-list">
          {paginatedJobs.map((job) => (
            <div className="job-item" key={job.id}>
              <img src={`http://localhost:5000/images/${job.image_path}`} alt={`${job.company_name} Logo`} className="company-logo" />
              <div className="job-info">
                <h4>
                  {job.title} | {job.district}{' '}
                  <span className="days-left">{job.days_left} days left</span>
                </h4>
                <p className="second-section">{job.company_name}</p>
                <p className="third-section">{job.field} | {job.type}</p>
                <Link to={`/jobs/${job.id}`} className="view-details">View Details</Link>
              </div>
            </div>
          ))}
          <div className="pagination">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              <FaArrowLeft />
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default JobList;
