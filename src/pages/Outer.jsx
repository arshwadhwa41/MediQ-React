import React, { useEffect, useState } from "react";
import "./Outer.css";

const Outer = () => {
  const taglines = [
    "Your Health, Our Priority",
    "Book OPD Appointments Easily", 
    "Skip the Queue, Stay Healthy",
    "MediQ — Care Made Simple"
  ];

  const [taglineIndex, setTaglineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const [displayText, setDisplayText] = useState("");

  // Slowest typing animation
  useEffect(() => {
    let timeoutId;
    
    const typeTagline = () => {
      if (typing) {
        if (charIndex < taglines[taglineIndex].length) {
          setDisplayText(taglines[taglineIndex].substring(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
          timeoutId = setTimeout(typeTagline, 300); // Slowest typing
        } else {
          setTyping(false);
          timeoutId = setTimeout(typeTagline, 4000); // Long pause
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(taglines[taglineIndex].substring(0, charIndex - 1));
          setCharIndex(prev => prev - 1);
          timeoutId = setTimeout(typeTagline, 150); // Slow deleting
        } else {
          setTyping(true);
          setTaglineIndex((prev) => (prev + 1) % taglines.length);
          timeoutId = setTimeout(typeTagline, 1000);
        }
      }
    };

    typeTagline();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [taglineIndex, charIndex, typing, taglines]);

  return (
    <div className="outer-container">
      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        {/* Top: Animated Tagline */}
        <div className="hero-top">
          <div className="hero-tagline">
            <span id="tagline-text">{displayText}</span>
          </div>
        </div>

        {/* Main Content - Left Aligned */}
        <div className="hero-content">
          {/* Left: Text & Buttons */}
          <div className="hero-text">
            <h1>Book Your OPD Appointments Online</h1>
            <p>Skip the queues, find top hospitals near you, and reserve your slot instantly.</p>
            <div className="hero-buttons">
              <button 
                className="btn-login" 
                onClick={() => window.location.href = "/login"}
              >
                Login
              </button>
              <button 
                className="btn-signup" 
                onClick={() => window.location.href = "/signup"}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Right: Doctor Image with Flip Effect */}
          <div className="hero-image">
            <div className="image-flip">
              <div className="flip-inner">
                <div className="flip-front">
                  <img
                    src="/assets/doctor_interaction.png"
                    alt="Doctor with Patient"
                    className="flip-img"
                  />
                </div>
                <div className="flip-back">
                  <img
                    src="/assets/MediQ_Logo.png"
                    alt="MediQ Logo"
                    className="flip-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-overlay">
          {/* Services Grid */}
          <h2 className="footer-heading">Our Services</h2>
          <div className="services-grid">
            <div className="service-card">✔ Online OPD Appointment Booking</div>
            <div className="service-card">✔ Quick Token Generation</div>
            <div className="service-card">✔ Real-time Hospital Availability</div>
            <div className="service-card">✔ Health & Wellness Tips</div>
            <div className="service-card">✔ Digital Prescription Storage</div>
            <div className="service-card">✔ Lab Test Bookings</div>
            <div className="service-card">✔ Emergency Assistance</div>
            <div className="service-card">✔ Doctor Consultation Reminders</div>
            <div className="service-card">✔ 24/7 Hospitals Available</div>
          </div>

          {/* Contact Info - Left Aligned */}
          <div className="contact-box">
            <h2>Get in Touch</h2>
            <p><strong>Email:</strong> arsh.1875.becse24@chitkara.edu.in</p>
            <p><strong>Phone:</strong> +91 72772 00059</p>
            <p><strong>Address:</strong> Chitkara University, Rajpura, India</p>
          </div>
        </div>
        <p className="footer-copy">© 2025 MediQ. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Outer;