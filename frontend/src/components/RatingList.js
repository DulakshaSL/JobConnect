import React, { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/RatingList.css';
import defaultUserImage from '../assets/images/account.png';

const RatingList = () => {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePictures, setProfilePictures] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const ratingsPerPage = 2;

  useEffect(() => {
    const fetchRatingsAndProfiles = async () => {
      try {
        setLoading(true);
        
        const ratingsRes = await fetch('http://localhost:5000/api/ratings');
        const ratingsData = await ratingsRes.json();

        if (!ratingsData.success) {
          throw new Error('Failed to fetch ratings');
        }

        const ratingsWithUserData = ratingsData.data;
        setRatings(ratingsWithUserData);

        const avgRes = await fetch('http://localhost:5000/api/ratings/average');
        const avgData = await avgRes.json();
        if (avgData.success) {
          const avg = parseFloat(avgData.data.average);
          setAverageRating(isNaN(avg) ? 0 : avg);
        }

        const userIds = [...new Set(ratingsWithUserData.map(r => r.jobseeker_id))];
        
        if (userIds.length > 0) {
          const profilesRes = await fetch('http://localhost:5000/api/profiles/ratings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: userIds })
          });
          const profilesData = await profilesRes.json();
          setProfilePictures(profilesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatingsAndProfiles();
  }, []);

  // Get current ratings for pagination
  const indexOfLastRating = currentPage * ratingsPerPage;
  const indexOfFirstRating = indexOfLastRating - ratingsPerPage;
  const currentRatings = ratings.slice(indexOfFirstRating, indexOfLastRating);
  const totalPages = Math.ceil(ratings.length / ratingsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star half-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }
    return stars;
  };

  if (loading) return <div className="loading">Loading ratings...</div>;

  return (
    <div className="rating-container">
      <div className="rating-header">
        <h2>Platform Ratings</h2>
        <div className="average-rating">
          <span className="average-number">
            {averageRating !== null ? averageRating.toFixed(1) : '--'}
          </span>
          <div className="stars">
            {renderStars(averageRating || 0)}
            <span className="total-ratings">({ratings.length} reviews)</span>
          </div>
        </div>
      </div>

      <div className="ratings-list">
        {currentRatings.length > 0 ? (
          currentRatings.map((rating) => {
            const userProfile = profilePictures[rating.jobseeker_id] || {};
            return (
              <div key={rating.id} className="rating-card">
                <div className="user-info">
                  <img 
                    src={userProfile.profile_picture || defaultUserImage}
                    alt={`${userProfile.first_name || 'User'} ${userProfile.sur_name || ''}`}
                    className="user-avatar"
                    onError={(e) => {
                      e.target.src = defaultUserImage;
                    }}
                  />
                  <div>
                    <h4>
                      {userProfile.first_name || 'Anonymous'} {userProfile.sur_name || ''}
                    </h4>
                    <div className="rating-stars">
                      {renderStars(rating.rating)}
                    </div>
                  </div>
                </div>
                <p className="comment">{rating.comment}</p>
                <p className="date">
                  {new Date(rating.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            );
          })
        ) : (
          <p className="no-ratings">No ratings yet. Be the first to review!</p>
        )}
      </div>

      {ratings.length > ratingsPerPage && (
        <div className="pagination">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 1}
            className="pagination-button"
          >
            <FaChevronLeft />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`pagination-button ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}
          
          <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default RatingList;