import React, { useState, useEffect } from 'react';
import '../styles/Carousel.css';

const Carousel = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/carousels');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched carousel data:', data);
        setCarouselItems(data);
      } catch (error) {
        console.error('Error fetching carousel data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselItems();
  }, []);

  useEffect(() => {
    if (!carouselItems.length) return;

    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!prevBtn || !nextBtn) return; // Prevent errors if elements are not found

    function showSlide(n) {
      slides.forEach((slide) => (slide.style.opacity = '0'));
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].style.opacity = '1';
    }

    function prevSlide() {
      showSlide(currentSlide - 1);
      resetSlideInterval();
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
      resetSlideInterval();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    setTimeout(() => showSlide(0), 50);

    let slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 3000);

    function resetSlideInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
      }, 3000);
    }

    return () => {
      prevBtn.removeEventListener('click', prevSlide);
      nextBtn.removeEventListener('click', nextSlide);
      clearInterval(slideInterval);
    };
  }, [carouselItems]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section id="carousel">
      <div id="carousel-container">
        {carouselItems.map((item, index) => (
          <div className="carousel-slide" key={index}>
            <img src={`http://localhost:5000/images/${item.image_path}`} alt={item.alt_text} />
            <div className="carousel-overlay">
              <h3>{item.overlay_title}</h3>
              <p>{item.overlay_content}</p>
              <a href={item.button_link} className="carousel-btn">{item.button_text}</a>
            </div>
          </div>
        ))}
        <button id="prevBtn">&#10094;</button>
        <button id="nextBtn">&#10095;</button>
      </div>
    </section>
  );
};

export default Carousel;
