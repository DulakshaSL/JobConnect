// src/components/Home.js
import React from 'react';
import '../styles/Home.css';
import feature1Image from '../assets/images/feature1.png';
import feature2Image from '../assets/images/feature2.png';
import feature3Image from '../assets/images/feature3.png';
import Carousel from './Carousel'; // Import the Carousel component
import LatestJobs from './LatestJobs';
import Events from './EventList';
import section1Image from '../assets/images/section1.jpg';
import TopHiringCompanies from './TopHiringCompanies';
import dish2Image from '../assets/images/grid2.jpg';
import dish3Image from '../assets/images/grid3.jpg';
import dish4Image from '../assets/images/grid4.jpg';
import aboutImage from '../assets/images/about.jpg';


function Home() {
  return (
    <div className="home">
      {/* Carousel Section */}
      <Carousel /> 

      {/* Features Section */}
      <section id="features">
  <h2 className="section-featurestitle">What We Offer</h2>
  <div className="container">
    <div className="features-card">
      <img src={feature1Image} alt="Career Connections" />
      <h3>Career Connections</h3>
      <p>Connect with top employers across industries and gain visibility for skills. We bridge the gap between professionals and companies.</p>
    </div>

    <div className="features-card">
      <img src={feature2Image} alt="Streamlined Applications" />
      <h3>Streamlined Applications</h3>
      <p>Save your resume and portfolio, and apply to jobs with one click. Our application process lets you focus on what matters.</p>
    </div>

    <div className="features-card">
      <img src={feature3Image} alt="Flexible Job Options" />
      <h3>Flexible Job Options</h3>
      <p>Find job opportunities that fit your lifestyle, whether you're looking for remote work, freelance projects, or full-time roles.</p>
    </div>
  </div>
</section>



<h2 class="section-title">About Us</h2>
<section id="about-us">
  <div class="about-container">
    <img src={aboutImage} alt="About JobConnect" class="about-img"/>
    
    <div class="about-text">
      <h3>Our Story</h3>
      <p>JobConnect was created with a vision to bridge the gap between job seekers and employers through intelligent job matching and advanced algorithms. Our platform streamlines the hiring process, making it more efficient and effective for both parties.</p>
      
      <h3>Our Commitment</h3>
      <p>At JobConnect, we are dedicated to empowering job seekers with personalized recommendations and giving employers access to the right talent. Our platform fosters professional growth through community engagement, skills assessments, and insightful analytics.</p>
      
      <a href="/about" class="learn-more">Learn More</a>
    </div>
  </div>
</section>

<LatestJobs />

{/* Menu Introduction Section */}
<section className="menu-introduction">
        <div className="intro-content">
        <h2>Discover AI-Powered Job Recommendations</h2>
        <p>
      Leverage the power of AI to find the perfect job for you. 
      JobConnect’s intelligent recommendation system matches your skills, experience, and preferences 
      with the most suitable opportunities, helping you advance your career with confidence.
    </p>
          <a href="/list" className="view-btn">Explore Jobs</a>
        </div>

        <div className="images-grid">
          <img src={section1Image} alt="AI" />
          
        </div>
      </section>





      <div className="App">
      <TopHiringCompanies />
    </div>

    <Events /> 

    </div>
  );
}

export default Home;

