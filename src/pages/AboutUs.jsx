import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="aboutus-page">
      {/* ========== NAVBAR ========== */}
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/Home">Home</Link>
        </div>
        <div className="nav-right">
          <Link to="/">
            <img src="/assets/MediQ_Logo.png" alt="MediQ Logo" className="logo" />
          </Link>
        </div>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">About MediQ</h1>
          <p className="hero-subtitle">Revolutionizing Healthcare Access in India</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Cities</span>
            </div>
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Hospitals</span>
            </div>
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Patients Served</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== MISSION SECTION ========== */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                MediQ is dedicated to making healthcare accessible, affordable, and convenient 
                for every Indian. We bridge the gap between patients and healthcare providers 
                through our innovative digital platform.
              </p>
              <p>
                Our vision is to create a healthcare ecosystem where quality medical care is 
                just a click away, eliminating long waiting times and geographical barriers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose MediQ?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Booking</h3>
              <p>Book OPD appointments in less than 2 minutes from anywhere</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏥</div>
              <h3>Verified Hospitals</h3>
              <p>All hospitals are verified and maintain high quality standards</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Affordable Care</h3>
              <p>Transparent pricing with no hidden charges</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer support for all your queries</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TEAM SECTION ========== */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">The passionate minds behind MediQ</p>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">AW</div>
              <h3>Arsh Wadhwa</h3>
              <p className="team-role">Project Lead & Full Stack Developer</p>
              <p className="team-desc">Driving the vision and technical implementation of MediQ</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">MG</div>
              <h3>Med Gaurdians</h3>
              <p className="team-role">Development & Design</p>
              <p className="team-desc">Creating seamless healthcare experiences through technology</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">CU</div>
              <h3>Chitkara University</h3>
              <p className="team-role">Educational Institution</p>
              <p className="team-desc">Providing the platform for innovation and growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section className="contact-section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <p>arsh.1875.becse24@chitkara.edu.in</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <div>
                  <h4>Phone</h4>
                  <p>+91 72772 00059</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🏫</span>
                <div>
                  <h4>Address</h4>
                  <p>Chitkara University, Rajpura, Punjab, India</p>
                </div>
              </div>
            </div>
            <div className="contact-message">
              <h3>We'd Love to Hear From You</h3>
              <p>
                Have questions or suggestions? Reach out to us and we'll get back to you 
                within 24 hours. Your feedback helps us improve MediQ for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="about-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/assets/MediQ_Logo.png" alt="MediQ Logo" className="footer-logo" />
            <h3>MediQ</h3>
            <p>Your Health, Our Priority</p>
          </div>
          <div className="footer-links">
            <Link to="/Home">Home</Link>
            <Link to="/hospitals">Hospitals</Link>
            <Link to="/aboutus">About Us</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 MediQ. All rights reserved. | Stay Healthy, Stay Safe 💙</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;