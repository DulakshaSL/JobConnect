// src/components/JobDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Import useNavigate
import '../styles/JobDetails.css';
import axios from 'axios';
import SaveIcon from '../assets/images/save.png';
import verifiedImage from '../assets/images/verified.png'; // Import your image
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa'; 

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate(); 
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    

    const fetchCompany = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/company/${jobId}`);
        setCompany(response.data);
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    fetchJob();
    fetchCompany();
  }, [jobId]);

  if (!job || !company) return <p>Loading job details...</p>;

  const handleApplyClick = () => {
    // Navigate to the application page for this job
    navigate(`/apply/${jobId}`);
  };

  return (
    <div className="job-details-container">
      {/* Left Side - Company Overview */}
      <div className="company-overview">
      <div className='company-section'>
        <h2 className='overview-title'>Company Overview</h2>
        {company.image_path && (
          <img src={`http://localhost:5000/images/${company.image_path}`} alt={`${company.company_name} Logo`} className="company-logo" />
        )}
        <div className='company-head'>
        <h3>{company.company_name}</h3>
        <img src={verifiedImage} alt="verified" />
        </div>
        <p>{company.company_overview}</p>
        <p className='no-jobs'><strong>Number of Jobs Posted:</strong> {company.no_of_jobs}</p>
        <div className="social-media-links">
        <a href={company.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin size={24} />
        </a>
        <a href={company.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FaTwitter size={24} />
        </a>
        <a href={company.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebook size={24} />
        </a>
      </div>
      </div>
      </div>
     

      {/* Right Side - Job Details */}
      <div className="job-details">
        <div className='job-section'>
          <div className='head-section'>
        <h2>{job.title} | {job.district}</h2>
        <p className='jtype'>{job.type} | {job.field}</p>
        <p className='jposted'> By  {job.posted_by} on {new Date(job.posted_date).toLocaleDateString()}</p>
        <Link to={`/apply/${jobId}`}>
            <button className="apply-btn">Apply For Job</button>
          </Link>

        <button className="save-btn"><img src={SaveIcon} alt="Save" className="save-icon" /></button>
        </div>
        
        <h4>Description:</h4>
        <p>{job.description}</p>

        <h4>Responsibilities:</h4>
        <ul>
          {job.responsibilities.split(',').map((resp, index) => (
            <li key={index}>{resp.trim()}</li>
          ))}
        </ul>

        <h4>Qualifications:</h4>
        <ul>
          {job.qualifications.split(',').map((qual, index) => (
            <li key={index}>{qual.trim()}</li>
          ))}
        </ul>

        <h4>How to Apply:</h4>
        <p className='htp'>{job.how_to_apply}</p>

        {job.job_poster && (
          <div className="job-poster-container">
            <h4>Job Poster:</h4>
            <img src={`http://localhost:5000/images/${job.job_poster}`} alt="Job Poster" className="job-poster" />
          </div>
        )}

 {/* Apply Button - Links to Application Page */}
 
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
