// src/components/RouteWrapper.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const RouteWrapper = ({ children }) => {
  const location = useLocation();
  const excludeHeaderFooter = location.pathname === '/signup' || 
  location.pathname === '/login' 
  || location.pathname === '/staff'|| location.pathname === '/dashboard' || location.pathname === '/addproduct'|| location.pathname === '/staffboard';
  

  return (
    <>
      {!excludeHeaderFooter && <Header />}
      <main>{children}</main>
      {!excludeHeaderFooter && <Footer />}
    </>
  );
};

export default RouteWrapper;