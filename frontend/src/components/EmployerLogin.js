import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/EmployerLogin.css'; // Make sure to create this CSS file
import '../styles/ToastStyles.css';
import { FaFacebook, FaGoogle, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import employerLoginImage from '../assets/login-image.png'; // Use an employer-specific image

const EmployerLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const res = await axios.post('http://localhost:5000/api/employers/login', formData, {
        withCredentials: true,
      });
  
      // Save employer email and ID in session storage
      sessionStorage.setItem('employerEmail', formData.email);
      sessionStorage.setItem('employerId', res.data.employerId);
      sessionStorage.setItem('companyId', res.data.companyId); // Store company ID if available
      
      toast.success(res.data.message);
      navigate('/empdashboard'); // Navigate to employer dashboard
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Invalid email or password.');
      } else {
        console.error('Login error:', error);
        toast.error('Failed to log in. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employer-login-container">
      <div className="employer-login-image">
        <img src={employerLoginImage} alt="Employer Login" />
      </div>
      <form onSubmit={handleSubmit} className="employer-login-form">
        <h2>Employer Portal - Login</h2>

        {/* Email Input */}
        <div className="floating-label-input">
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="floating-input"
            placeholder=" "
          />
          <label htmlFor="email" className="floating-label">Company Email</label>
        </div>

        {/* Password Input */}
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

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="links">
          <a href="/employer/forgot-password" className="forgot-password">Forgot Password?</a>
        </div>
        
        <span className="signup-link">
          Don't have an account? <a href="/employer/signup">Register Your Company</a>
        </span>

        <div className="social-login">
          <p>or login with</p>
          <div className="social-icons">
            <a href="http://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="http://google.com" target="_blank" rel="noopener noreferrer">
              <FaGoogle />
            </a>
            <a href="http://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EmployerLogin;