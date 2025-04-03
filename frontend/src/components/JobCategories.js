import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/JobCategories.css';

const JobCategories = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const itemsPerPage = 8; // 3 rows x 3 columns

  useEffect(() => {
    const fetchJobFields = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs/fields/counts');
        setFields(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobFields();
  }, []);

  const handleFieldClick = (field) => {
    navigate(`/jobs/field/${encodeURIComponent(field)}`);
  };

  const totalPages = Math.ceil(fields.length / itemsPerPage);
  const paginatedFields = fields.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <section className="job-categories-section">
      <h2 className="field-title">Browse by Field</h2>

      <div className="container">
        <div className="navigation-container">
          <button 
            className="nav-arrow" 
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            <ChevronLeft size={32} />
          </button>

          <div className="fields-grid">
            {paginatedFields.map((fieldData, index) => (
              <div 
                className="field-card" 
                key={index}
                onClick={() => handleFieldClick(fieldData.field)}
              >
                <h3>{fieldData.field}</h3>
                <p className="job-count">{fieldData.count} jobs available</p>
                <div className="view-jobs">View Jobs →</div>
              </div>
            ))}
          </div>

          <button 
            className="nav-arrow" 
            onClick={handleNext}
            disabled={currentPage === totalPages - 1 || fields.length <= itemsPerPage}
          >
            <ChevronRight size={32} />
          </button>
        </div>

       
      </div>
    </section>
  );
};

export default JobCategories;