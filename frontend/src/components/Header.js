// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/Header.css'; // Make sure your CSS file path is correct
import companylogoImage from '../assets/images/companylogo.png';
import searchImage from '../assets/images/search.png';
import userImage from '../assets/images/account.png';
import jobImage from '../assets/images/subimage1.jpg'; // Image for Jobs submenu
import communityImage from '../assets/images/subimage4.jpg'; // Image for Contact submenu
import servicesImage from '../assets/images/subimage2.png'; // Image for Services submenu
import contactImage from '../assets/images/subimage3.jpg'; // Image for Contact submenu
import arrowIcon from '../assets/images/arrow.png';
import MiniLoginIcon from '../assets/images/minilogin.png';
import MiniSignupIcon from '../assets/images/minisignup.png';

const Header = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [gemCount, setGemCount] = useState(0);
  const [user, setUser] = useState(null);

  const [activeDropdown, setActiveDropdown] = useState(null);

  // Toggle dropdown visibility based on clicked item
  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Close dropdown when clicked outside
  const handleOutsideClick = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    // Fetch cart items and user details from backend or local storage
    fetchCartItems();
    fetchUserDetails();
  }, []);

  const fetchCartItems = () => {
    // Fetch cart items logic here (replace with your API endpoint)
    // For example: setCartItems([{product_name: 'Shirt', quantity: 1, size: 'M', product_price: 1500}]);
  };

  const fetchUserDetails = () => {
    // Fetch user details (like gem count and session info)
    // For example: setUser({ username: 'John Doe', gems: 20 });
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const showCartDetails = () => {
    document.getElementById('cart-dropdown-content').style.display = 'block';
  };

  const hideCartDetails = () => {
    document.getElementById('cart-dropdown-content').style.display = 'none';
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
                    <img src={userImage}  alt="User Account" className="login-icon" />
                  </a>
                  <div className={`dropdown-content ${isDropdownVisible ? 'show' : ''}`} id="dropdownMenu">
                    <Link to="/profile">Profile</Link>
                    <Link to="/history">Order History</Link>
                    <Link to="/logout">Logout</Link>
                  </div>
                </>
              ) : (
                <>
                  <a href="#" onClick={toggleDropdown}>
                    <img src={userImage} alt="Login/Register" className="login-icon" />
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

          {/* Jobs with Submenu */}
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
                  <li><Link to="/list/Part-Time">Part-Time <img src={arrowIcon} alt="Arrow" className="arrow-icon" /></Link></li>
                  <li><Link to="/list/Full-Time">Full-Time <img src={arrowIcon} alt="Arrow" className="arrow-icon" /></Link></li>
                  <li><Link to="/list/Free-Lance">Freelance <img src={arrowIcon} alt="Arrow" className="arrow-icon" /></Link></li>
                </ul>
              </div>
            )}
          </li>

          {/* Community with Submenu */}
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
            
            {activeDropdown === 'community' && (
              <div className="submenu-container">
                <img src={communityImage} alt="Services Icon" className="submenu-image" />
                <ul className="submenu">
                  <li><Link to="/services/resume">Resume Building <img src={arrowIcon} alt="Arrow" className="arrow-icon" /></Link></li>
                  <li><Link to="/services/interview">Interview Prep <img src={arrowIcon} alt="Arrow" className="arrow-icon" /></Link></li>
                  <li><Link to="/services/networking">Networking Events <img src={arrowIcon} alt="Arrow" className="arrow-icon" /></Link></li>
                </ul>
              </div>
            )}
          </li>

          {/* Services with Submenu */}
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

          {/* Contact with Submenu */}
          <li
            className="nav-item has-dropdown"
            onMouseEnter={() => handleDropdownToggle('contact')}
            onMouseLeave={() => handleDropdownToggle(null)}
            onClick={(e) => {
              e.stopPropagation();
              handleDropdownToggle('contact');
            }}
          >
            
              Contact 
            
            {activeDropdown === 'contact' && (
              <div className="submenu-container">
                <img src={contactImage} alt="Contact Icon" className="submenu-image" />
                <ul className="submenu">
                  <li><Link to="/contact/email">Email Us <img src={arrowIcon} alt="Arrow" className="arrow-icon" /></Link></li>
                  <li><Link to="/contact/call">Call Us <img src={arrowIcon} alt="Arrow" className="arrow-icon" /></Link></li>
                  <li><Link to="/contact/visit">Visit Our Office <img src={arrowIcon} alt="Arrow" className="arrow-icon" /></Link></li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </div>
      
    </header>
  );
};

export default Header;
