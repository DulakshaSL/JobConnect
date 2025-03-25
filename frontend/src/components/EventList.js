// src/components/EventList.js
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { format } from 'date-fns';
import '../styles/EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 3;

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
  }, []);

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

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="event-container">
      <div className="header">
        <h2>Upcoming Events</h2>
      </div>
      
      <div className="event-navigation">
        <button 
          onClick={prevPage} 
          disabled={currentPage === 0}
          className="nav-arrow"
        >
          <FaArrowLeft />
        </button>
        
        <div className="event-list">
          {visibleEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        
        <button 
          onClick={nextPage} 
          disabled={currentPage >= totalPages - 1}
          className="nav-arrow"
        >
          <FaArrowRight />
        </button>
      </div>
      
      
    </div>
  );
};

export default EventList;