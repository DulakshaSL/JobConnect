import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/JobSeekerLogin.css';
import '../styles/ToastStyles.css'; 
import { FaFacebook, FaGoogle, FaLinkedin } from 'react-icons/fa'; // Import social media icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import loginImage from '../assets/login-image.png'; // Import your image

const JobSeekerLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the login process
  
    try {
      const res = await axios.post('http://localhost:5000/api/jobseekers/login', formData, {
        withCredentials: true,  // Include credentials (cookies) in the request
      });
  
      // Save the user email and ID in session storage after successful login
      sessionStorage.setItem('jobSeekerEmail', formData.email);
      sessionStorage.setItem('jobSeekerId', res.data.jobSeekerId);
      
  
      toast.success(res.data.message);
      navigate('/home'); // Navigate to the home page after login
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Invalid email or password.');
      } else {
        console.error('Login error:', error);
        toast.error('Failed to log in. Please try again later.');
      }
    } finally {
      setLoading(false); // Set loading to false after the login process is complete
    }
  };
  
  
  return (
    <div className="login-container">
  <div className="login-image">
    <img src={loginImage} alt="Login" />
  </div>
  <form onSubmit={handleSubmit} className="login-form">
    <h2>JobConnect - Login</h2>

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
      <label htmlFor="email" className="floating-label">Enter Your Email</label>
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
      <label htmlFor="password" className="floating-label">Enter Your Password</label>
    </div>

    <button type="submit" disabled={loading}>
      {loading ? 'Logging in...' : 'Login'}
    </button>

    <div className="links">
      <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
    </div>
    
    <span className="signup-link">Don't have an account? <a href="/signup">Sign Up</a></span>

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

export default JobSeekerLogin;
