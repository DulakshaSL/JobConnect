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
import JobCategories from './JobCategories';
import RatingList from './RatingList';


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

<LatestJobs />

<JobCategories/> 

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

      <Events /> 
    

      <div className="App">
      <TopHiringCompanies />
    </div>


    <RatingList /> 












     
 
    </div>
  );
}

export default Home;

