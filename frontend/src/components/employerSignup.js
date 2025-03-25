import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/JobSeekerSignup.css'; // You might want to create a separate CSS file for employer
import '../styles/ToastStyles.css';
import employerImage1 from '../assets/image1.png'; // Replace with appropriate employer images
import employerImage2 from '../assets/image2.png';
import employerImage3 from '../assets/image3.png';
import { useNavigate } from 'react-router-dom';

const images = [
  employerImage1,
  employerImage2,
  employerImage3,
];

const EmployerSignup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    phone_number: '',
    company_name: '',
    company_overview: '',
    registration_id: '',
    image_path: null, 
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFormData({ ...formData, image_path: e.target.files[0] });
  const navigate = useNavigate();

  // Email validation: Check if employer email already exists
  const validateEmail = async () => {
    if (!formData.email) {
      toast.error('Please enter your email.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/employers/check-email', {
        email: formData.email,
      });
      if (res.data.message === 'Email already exists.') {
        toast.error('Email already exists. Please use a different one.');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Email already exists. Please use a different one.');
      } else {
        console.error('Error checking email:', error);
        toast.error('Error validating email. Try again later.');
      }
    }
  };

  const handleEmailBlur = () => {
    validateEmail();
  };

  const nextStep = () => {
    let requiredFields = [];

    switch (step) {
      case 1:
        requiredFields = ['email', 'password', 'confirm_password'];
        if (formData.password !== formData.confirm_password) {
          toast.error("Passwords do not match.");
          return;
        }
        break;
      case 2:
        requiredFields = ['phone_number', 'company_name', 'registration_id'];
        break;
      case 3:
        requiredFields = ['company_overview'];
        break;
      default:
        break;
    }

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in the ${field.replace('_', ' ')} field.`);
        return;
      }
    }

    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match on form submission
    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          data.append(key, value);
        }
      });

      const res = await axios.post('http://localhost:5000/api/employers/register', data);
      
      toast.success('Employer and company registered successfully!', {
        autoClose: 2000,
      });
      
      setTimeout(() => {
        navigate('/emplogin');
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error('Registration failed.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-step">
            <h2>Account Information</h2>
            <h4>Please provide your account details</h4>

            <div className="floating-label-input">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleEmailBlur}
                required
                className="floating-input"
                placeholder=" "
              />
              <label htmlFor="email" className="floating-label">Business Email</label>
            </div>

            <div className="floating-label-input">
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="floating-input"
                placeholder=" "
              />
              <label htmlFor="password" className="floating-label">Password</label>
            </div>

            <div className="floating-label-input">
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
                className="floating-input"
                placeholder=" "
              />
              <label htmlFor="confirm_password" className="floating-label">Confirm Password</label>
            </div>

            <div className="button-group">
              <button type="button" className="btnnext" onClick={nextStep}>Next</button>
            </div>

            <h4 className="login-prompt">
              Already Have An Account? <a href="/login" className="login-link">Login Now</a>
            </h4>
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h2>Company Information</h2>

            <div className="floating-label-input">
              <input
                type="text"
                name="phone_number"
                id="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                className="floating-input"
                placeholder=" "
              />
              <label htmlFor="phone_number" className="floating-label">Phone Number</label>
            </div>

            <div className="floating-label-input">
              <input
                type="text"
                name="company_name"
                id="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
                className="floating-input"
                placeholder=" "
              />
              <label htmlFor="company_name" className="floating-label">Company Name</label>
            </div>

            <div className="floating-label-input">
              <input
                type="text"
                name="registration_id"
                id="registration_id"
                value={formData.registration_id}
                onChange={handleChange}
                required
                className="floating-input"
                placeholder=" "
              />
              <label htmlFor="registration_id" className="floating-label">Company Registration ID</label>
            </div>

            <div className="button-group">
              <button type="button" onClick={prevStep}>Back</button>
              <button type="button" className="btnnext" onClick={nextStep}>Next</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h2>Company Details</h2>

            <div className="floating-label-input">
              <textarea
                name="company_overview"
                id="company_overview"
                value={formData.company_overview}
                onChange={handleChange}
                required
                className="floating-input-textarea"
                placeholder=" "
                rows="4"
              />
              <label htmlFor="company_overview" className="floating-label">Company Overview</label>
            </div>

           

            <div className="button-group">
              <button type="button" onClick={prevStep}>Back</button>
              <button type="submit">Finish</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="signup-container">
      <div className="image-container">
        <img src={images[step - 1]} alt="Employer Registration" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="progress-bar">
            <div 
              style={{ width: `${((step - 1) / 2) * 100}%` }}
              className="progress"
            ></div>
            <div className="step-numbers">
              {Array.from({ length: 3 }, (_, index) => (
                <div 
                  key={index} 
                  className={`step ${step === index + 1 ? 'active' : ''}`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
          {renderStep()}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmployerSignup;