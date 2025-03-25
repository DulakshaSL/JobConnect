import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/Footer.css'; // Make sure your CSS file path is correct
import companylogoImage from '../assets/images/companylogo.png';
import contactusImage from '../assets/images/mail.png';
import onlineImage from '../assets/images/customer-service.png';
import trackImage from '../assets/images/received.png';

const Footer = () => {
  return (
    <footer id="footer">
      <h2 id="morelabel">Looking For Something Else?</h2>
      <section id="more-section">
        <div className="info-section">
          <div className="info-card">
            <img src={contactusImage} alt="Contact Us" />
            <h3>Contact</h3>
            <p>Feel free to contact us!</p>
            <Link to="/contact"> {/* Use Link to navigate within React Router */}
              <button>Contact Us</button>
            </Link>
          </div>
          

          <div className="info-card">
            <img src={onlineImage} alt="Support" />
            <h3>Support</h3>
            <p>Get help with your online order</p>
            <Link to="/profile">
              <button>Get Help</button>
            </Link>
          </div>

          <div className="info-card">
            <img src={trackImage} alt="Track Order" />
            <h3>Order</h3>
            <p>Track Your Order</p>
            <Link to="/profile">
              <button>Track Order</button>
            </Link>
          </div>
        </div>
      </section>

      <section id="Other-Details">
        <div className="branches">
          <h3>Branch Locations</h3>
          <img src={companylogoImage} alt="Company Logo" />

          <div className="branch-locations">
            <div className="branch main-branch">
              <h4>Main Branch</h4>
              <p>Address: 456 Lakeview St, Hambanthota, Sri Lanka</p>
              <p>Contact: (94) 456-7890</p>
            </div>

            <div className="branch other-branch">
              <h4>Other Branch</h4>
              <p>Address: 246 Main St, Colombo, Sri Lanka</p>
              <p>Contact: (94) 765-4321</p>
            </div>
          </div>

          <div id="faq">
            <h4>©2024 ABC Restaurant All Rights Reserved</h4>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
