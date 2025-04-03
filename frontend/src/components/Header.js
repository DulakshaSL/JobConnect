// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import companylogoImage from '../assets/images/companylogo.png';
import searchImage from '../assets/images/search.png';
import defaultUserImage from '../assets/images/account.png';
import jobImage from '../assets/images/subimage1.jpg';
import servicesImage from '../assets/images/subimage2.png';
import contactImage from '../assets/images/subimage3.jpg';
import arrowIcon from '../assets/images/arrow.png';
import MiniLoginIcon from '../assets/images/minilogin.png';
import MiniSignupIcon from '../assets/images/minisignup.png';
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@800&display=swap" rel="stylesheet"></link>

const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activePage, setActivePage] = useState('');


  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleOutsideClick = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      // Fetch basic user info
      const userResponse = await fetch('http://localhost:5000/api/jobseekers/current-user', {
        credentials: 'include',
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        
        // Fetch profile info including profile picture
        const profileResponse = await fetch('http://localhost:5000/api/profile', {
          credentials: 'include',
        });

        let profilePicture = defaultUserImage;
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          if (profileData.profile_picture) {
            profilePicture = profileData.profile_picture;
          }
        }

        setUser({
          id: userData.id,
          email: userData.email,
          profilePicture: profilePicture,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobseekers/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
        window.location.href = '/login';
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <header>
      <div id="overlay"></div>
      <div className="top-row">
        <div className="logo-container">
          <Link to="/">
            <img src={companylogoImage} alt="Signature Cuisine Logo" className="logoicon" />
          </Link>
          <div id="logo">JobConnect</div>
        </div>

        <nav>
          <button className="hamburger" id="hamburgerBtn">
            <img src="/resources/hamburger.png" alt="Menu" />
          </button>
          <ul id="navList">
            <li className="search-icon">
              <a href="#" id="search-icon-link">
                <img id="search-icon-img" src={searchImage} alt="Search Icon" />
              </a>
            </li>
            <div id="search-bar" style={{ display: 'none' }}>
              <div className="search-container">
                <input type="text" id="search-input" placeholder="Search..." />
                <div id="search-results" className="search-results"></div>
              </div>
            </div>

            <li className="account-dropdown">
              {user ? (
                <>
                  <a href="#" onClick={toggleDropdown}>
                    <img 
                      src={user.profilePicture} 
                      alt="User Account" 
                      className="login-icon profile-picture"
                    />
                  </a>
                  <div className={`dropdown-content ${isDropdownVisible ? 'show' : ''}`} id="dropdownMenu">
                    <Link to="/profile">Profile</Link>
                    <a href="#" onClick={handleLogout}>Logout</a> 
                  </div>
                </>
              ) : (
                <>
                  <a href="#" onClick={toggleDropdown}>
                    <img src={defaultUserImage} alt="Login/Register" className="login-icon" />
                  </a>
                  <div className={`dropdown-content ${isDropdownVisible ? 'show' : ''}`} id="dropdownMenu">
                    <Link to="/login">Login <img src={MiniLoginIcon} alt="Arrow" className="mini-login" /> </Link>
                    <Link to="/signup">Signup <img src={MiniSignupIcon} alt="Arrow" className="mini-signup" /></Link>
                  </div>
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="bottom-section" onClick={handleOutsideClick}>
        <nav>
          <ul>
            <li className="nav-item">
              <Link to="/home">Home</Link>
            </li>

            <li
              className="nav-item has-dropdown"
              onMouseEnter={() => handleDropdownToggle('jobs')}
              onMouseLeave={() => handleDropdownToggle(null)}
              onClick={(e) => {
                e.stopPropagation();
                handleDropdownToggle('jobs');
              }}
            >
              Jobs
              {activeDropdown === 'jobs' && (
                <div className="submenu-container">
                  <img src={jobImage} alt="Jobs Icon" className="submenu-image" />
                  <ul className="submenu">
                    <li><Link to="/list">All Jobs <img src={arrowIcon} alt="Arrow" className="arrow-icon" /></Link></li>
                    <li><Link to="/list/Part-Time">Part-Time <img src={arrowIcon} alt="Arrow" className="arrow-icon" /></Link></li>
                    <li><Link to="/list/Full-Time">Full-Time <img src={arrowIcon} alt="Arrow" className="arrow-icon" /></Link></li>
                    <li><Link to="/list/Free-Lance">Freelance <img src={arrowIcon} alt="Arrow" className="arrow-icon" /></Link></li>
                  </ul>
                </div>
              )}
            </li>

            <li
              className="nav-item has-dropdown"
              onMouseEnter={() => handleDropdownToggle('community')}
              onMouseLeave={() => handleDropdownToggle(null)}
              onClick={(e) => {
                e.stopPropagation();
                handleDropdownToggle('community');
              }}
            >
              Community
             
            </li>

            <li
              className="nav-item has-dropdown"
              onMouseEnter={() => handleDropdownToggle('services')}
              onMouseLeave={() => handleDropdownToggle(null)}
              onClick={(e) => {
                e.stopPropagation();
                handleDropdownToggle('services');
              }}
            >
              Services
              {activeDropdown === 'services' && (
                <div className="submenu-container">
                  <img src={servicesImage} alt="Services Icon" className="submenu-image" />
                  <ul className="submenu">
                    <li><Link to="/services/resume">Resume Building <img src={arrowIcon} alt="Arrow" className="arrow-icon" /></Link></li>
                    <li><Link to="/services/interview">Interview Prep <img src={arrowIcon} alt="Arrow" className="arrow-icon" /></Link></li>
                    <li><Link to="/services/networking">Networking Events <img src={arrowIcon} alt="Arrow" className="arrow-icon" /></Link></li>
                  </ul>
                </div>
              )}
            </li>

            <li className="nav-item">
              <Link to="/contact"> Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;