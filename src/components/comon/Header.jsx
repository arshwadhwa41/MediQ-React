import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img src="/assets/MediQ_Logo.png" alt="MediQ Logo" className="logo" />
        <h1>MediQ - Healthcare Simplified</h1>
      </div>
    </header>
  );
};

export default Header;