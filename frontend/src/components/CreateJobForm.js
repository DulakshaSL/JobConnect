import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateJobForm.css';

const CreateJobForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    type: 'Full-Time',
    field: 'Engineering',
    district: '',
    description: '',
    salary: '',
    days_left: 30,
    min_experience: 0,
    highest_qualification: 'Bachelor',
    qualification_field: '',
    responsibilities: '',
    qualifications: '',
    how_to_apply: '',
    // New fields added
    role: '',
    preferred_gender: '',
    min_age: '',
    max_age: '',
    max_experience: '',
    job_poster: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Add company_id and posted_by from session/local storage
      const completeJobData = {
        ...formData,
        company_id: localStorage.getItem('companyId'), // Or from context/state
        company_name: localStorage.getItem('companyName'), // Or from context/state
        posted_by: localStorage.getItem('employerId'), // Or from context/state
        posted_date: new Date(),
        image_path: null // Can be updated if you implement file upload
      };

      const response = await axios.post(
        'http://localhost:5000/api/employers/jobs',
        completeJobData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        navigate('/employer/jobs');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job');
      console.error('Error creating job:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-job-container">
      <h2>Create New Job Posting</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-group">
            <label>Job Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Job Type*</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div className="form-group">
              <label>Field*</label>
              <select
                name="field"
                value={formData.field}
                onChange={handleChange}
                required
              >
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Specific Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Location (District)*</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Preferred Gender</label>
              <select
                name="preferred_gender"
                value={formData.preferred_gender}
                onChange={handleChange}
              >
                <option value="">No Preference</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Job Poster Name</label>
              <input
                type="text"
                name="job_poster"
                value={formData.job_poster}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Job Details</h3>
          <div className="form-group">
            <label>Description*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Salary (USD)*</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Days Active*</label>
              <input
                type="number"
                name="days_left"
                value={formData.days_left}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Experience Requirements</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Minimum Experience (Years)*</label>
              <input
                type="number"
                name="min_experience"
                value={formData.min_experience}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Maximum Experience (Years)</label>
              <input
                type="number"
                name="max_experience"
                value={formData.max_experience}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Minimum Age</label>
              <input
                type="number"
                name="min_age"
                value={formData.min_age}
                onChange={handleChange}
                min="18"
              />
            </div>

            <div className="form-group">
              <label>Maximum Age</label>
              <input
                type="number"
                name="max_age"
                value={formData.max_age}
                onChange={handleChange}
                min="18"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Education Requirements</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Highest Qualification*</label>
              <select
                name="highest_qualification"
                value={formData.highest_qualification}
                onChange={handleChange}
                required
              >
                <option value="Bachelor">Bachelor's Degree</option>
                <option value="Master">Master's Degree</option>
                <option value="PhD">PhD</option>
                <option value="Diploma">Diploma</option>
                <option value="Certificate">Certificate</option>
              </select>
            </div>

            <div className="form-group">
              <label>Qualification Field</label>
              <input
                type="text"
                name="qualification_field"
                value={formData.qualification_field}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Responsibilities & Qualifications</h3>
          <div className="form-group">
            <label>Responsibilities*</label>
            <textarea
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          <div className="form-group">
            <label>Qualifications*</label>
            <textarea
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Application Process</h3>
          <div className="form-group">
            <label>How to Apply*</label>
            <textarea
              name="how_to_apply"
              value={formData.how_to_apply}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate('/employer/jobs')}>
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Creating...' : 'Create Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobForm;