// src/components/EventList.js
import React, { useEffect, useState, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { format } from 'date-fns';
import '../styles/EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardsPerPage = 3;
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (events.length === 0 || isHovered || isAnimating) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      nextPage();
    }, 3000); // Slide every 3 seconds

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [events, isHovered, currentPage, isAnimating]);

  const EventCard = ({ event }) => {
    return (
      <div className="event-card">
        <div className="event-card-image">
          <img 
            src={event.image_path ? `http://localhost:5000/images/${event.image_path}` : '/default-event.jpg'} 
            alt={`${event.title} Image`} 
            className="event-image"
          />
        </div>
        <div className="event-card-content">
          <h3>{event.title}</h3>
          <p className="location">{event.location}</p>
          <p className="date">
            {format(new Date(event.date), 'MM/yy')}
          </p>
        </div>
      </div>
    );
  };

  const totalPages = Math.ceil(events.length / cardsPerPage);
  const visibleEvents = events.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const handlePageChange = (newPage) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsAnimating(false);
    }, 300);
  };

  const nextPage = () => {
    if (!isAnimating) {
      const nextPage = (currentPage + 1) % totalPages;
      handlePageChange(nextPage);
    }
  };

  const prevPage = () => {
    if (!isAnimating) {
      const prevPage = (currentPage - 1 + totalPages) % totalPages;
      handlePageChange(prevPage);
    }
  };

  return (
    <div 
      className="event-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="event-header">
        <h2>Upcoming Events</h2>
      </div>
      
      <div className="event-navigation">
        <button 
          onClick={prevPage} 
          disabled={currentPage === 0 || isAnimating}
          className="nav-arrow"
        >
          <FaArrowLeft />
        </button>
        
        <div className={`event-list ${isAnimating ? 'fade-out' : 'fade-in'}`}>
          {visibleEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        
        <button 
          onClick={nextPage} 
          disabled={currentPage >= totalPages - 1 || isAnimating}
          className="nav-arrow"
        >
          <FaArrowRight />
        </button>
      </div>
      
      <div className="progress-indicators">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(index)}
            disabled={isAnimating}
          />
        ))}
      </div>

      
    </div>
  );
};

export default EventList;