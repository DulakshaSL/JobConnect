import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/TopHiringCompanies.css';

const TopHiringCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const companiesPerPage = 3; // 3 cards per row

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/top-hiring-companies');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching top hiring companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const displayedCompanies = companies.slice(currentIndex, currentIndex + companiesPerPage);

  const handleNext = () => {
    if (currentIndex + companiesPerPage < companies.length) {
      setCurrentIndex(currentIndex + companiesPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - companiesPerPage >= 0) {
      setCurrentIndex(currentIndex - companiesPerPage);
    }
  };

  return (
    <section className="top-hiring-companies dark-theme">
      <h2>Top Hiring Companies</h2>
      
      <div className="companies-wrapper">
        <button 
          className="arrow-btn" 
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={32} />
        </button>

        <div className="company-cards-container">
          {displayedCompanies.map((company) => (
            <div className="company-card" key={company.id}>
              <img
                src={`http://localhost:5000/images/${company.image_path}`}
                alt={company.name}
                className="company-image"
              />
              <div className="company-info">
                <h3>{company.name}</h3>
                <p>{company.no_of_jobs} jobs</p>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="arrow-btn" 
          onClick={handleNext}
          disabled={currentIndex + companiesPerPage >= companies.length}
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </section>
  );
};

export default TopHiringCompanies;