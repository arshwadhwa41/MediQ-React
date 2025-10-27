import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Bookings.css';

const Bookings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    guardian: '',
    phone: '',
    sex: '',
    age: '',
    address: '',
    date: '',
    time: ''
  });

  // State for hospital info
  const [hospitalInfo, setHospitalInfo] = useState({
    name: 'Selected',
    city: 'Selected'
  });

  // State for UI
  const [taglineText, setTaglineText] = useState('');
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Taglines for typing animation
  const taglines = [
    "Apni details fill karo appointment book karne ke liye…",
    "Sahi date & time choose karo, baaki hum sambhaal lenge!",
    "Fast, simple, reliable — MediQ Appointment Booking"
  ];

  // Get hospital data from navigation state
  useEffect(() => {
    if (location.state && location.state.hospital) {
      setHospitalInfo({
        name: location.state.hospital,
        city: location.state.city || 'Selected City'
      });
    }
  }, [location.state]);

  // Typing animation effect
useEffect(() => {
  const typeLoop = () => {
    const text = taglines[taglineIndex];

    if (isTyping) {
      // ✍️ Typing mode (~3s per line)
      if (charIndex < text.length) {
        setTaglineText(text.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        // 100ms per char → ~3s for 30 chars
        setTimeout(typeLoop, 100);
      } else {
        // Pause before deleting
        setIsTyping(false);
        setTimeout(typeLoop, 1000); // wait 1s before erase
      }
    } else {
      // 🧽 Deleting mode (~2.5s per line)
      if (charIndex > 0) {
        setTaglineText(text.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        // 80ms per char → ~2.5s total
        setTimeout(typeLoop, 80);
      } else {
        // Move to next tagline with short pause
        setIsTyping(true);
        setTaglineIndex((taglineIndex + 1) % taglines.length);
        setTimeout(typeLoop, 700);
      }
    }
  };

  typeLoop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [taglineIndex, charIndex, isTyping]);


  // Set minimum date to today
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const minDate = `${yyyy}-${mm}-${dd}`;
    
    // Set min date in form data if empty
    if (!formData.date) {
      setFormData(prev => ({ ...prev, date: minDate }));
    }
  }, [formData.date]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Please enter full name";
    }

    // Guardian validation
    if (!formData.guardian.trim()) {
      newErrors.guardian = "Please enter father/husband name";
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Enter valid 10-digit number";
    }

    // Sex validation
    if (!formData.sex) {
      newErrors.sex = "Please select";
    }

    // Age validation
    const ageVal = Number(formData.age);
    if (!(ageVal >= 0 && ageVal <= 120)) {
      newErrors.age = "Enter valid age (0-120)";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Please enter address";
    }

    // Date validation
    if (!formData.date) {
      newErrors.date = "Please pick a date";
    }

    // Time validation (between 10:00 and 17:00)
    if (!formData.time) {
      newErrors.time = "Please pick a time";
    } else {
      const [hh, mm] = formData.time.split(":").map(Number);
      const mins = hh * 60 + mm;
      const start = 10 * 60, end = 17 * 60;
      if (mins < start || mins > end) {
        newErrors.time = "Time must be between 10:00 and 17:00";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Generate token
    const token = "MQ" + Math.floor(100000 + Math.random() * 900000);

    // Show success toast
    setToastMessage(`Token ${token} for ${formData.date} at ${formData.time} sent to ${formData.phone}`);
    setShowToast(true);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Hide toast after delay
    setTimeout(() => {
      setShowToast(false);
    }, 4200);

    // Reset form after delay
    setTimeout(() => {
      setFormData({
        name: '',
        guardian: '',
        phone: '',
        sex: '',
        age: '',
        address: '',
        date: '',
        time: ''
      });
    }, 800);
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      name: '',
      guardian: '',
      phone: '',
      sex: '',
      age: '',
      address: '',
      date: '',
      time: ''
    });
    setErrors({});
  };

  // Handle back to hospitals
  const handleBackToHospitals = () => {
    navigate(-1); // Go back to previous page (hospitals list)
  };

  return (
    <div className="bookings-page">
      {/* ===== Topbar / Tagline ===== */}
      <header className="topbar">
        <div className="topbar__inner">
          <h1 id="tagline-text" aria-live="polite">{taglineText}</h1>

          <div className="chosen-hospital">
            <span className="chip">
              Hospital: <strong>{hospitalInfo.name}</strong>
            </span>
            <button 
              className="btn btn--ghost" 
              onClick={handleBackToHospitals}
              style={{ marginLeft: '10px', fontSize: '12px', padding: '4px 8px' }}
            >
              Change Hospital
            </button>
          </div>
        </div>
      </header>

      {/* ===== Main Content ===== */}
      <main className="container">
        <section className="card">
          <form id="bookingForm" className="form" onSubmit={handleSubmit} noValidate>
            <h2 className="section-title">Patient Details</h2>

            <div className="grid">
              <div className="field">
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  className="input" 
                  required 
                  placeholder=" "
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <label htmlFor="name" className="label">Full Name*</label>
                {errors.name && <small className="error">{errors.name}</small>}
              </div>

              <div className="field">
                <input 
                  type="text" 
                  id="guardian"
                  name="guardian"
                  className="input" 
                  required 
                  placeholder=" "
                  value={formData.guardian}
                  onChange={handleInputChange}
                />
                <label htmlFor="guardian" className="label">Father/Husband Name*</label>
                {errors.guardian && <small className="error">{errors.guardian}</small>}
              </div>

              <div className="field">
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  className="input" 
                  required 
                  placeholder=" " 
                  pattern="^[0-9]{10}$"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <label htmlFor="phone" className="label">Phone Number (10 digits)*</label>
                {errors.phone && <small className="error">{errors.phone}</small>}
              </div>

              <div className="field">
                <select 
                  id="sex"
                  name="sex"
                  className="input select" 
                  required
                  value={formData.sex}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                <label htmlFor="sex" className="label label--select">Sex*</label>
                {errors.sex && <small className="error">{errors.sex}</small>}
              </div>

              <div className="field">
                <input 
                  type="number" 
                  id="age"
                  name="age"
                  className="input" 
                  required 
                  placeholder=" " 
                  min="0" 
                  max="120"
                  value={formData.age}
                  onChange={handleInputChange}
                />
                <label htmlFor="age" className="label">Age*</label>
                {errors.age && <small className="error">{errors.age}</small>}
              </div>

              <div className="field field--full">
                <textarea 
                  id="address"
                  name="address"
                  className="input textarea" 
                  required 
                  placeholder=" " 
                  rows="3"
                  value={formData.address}
                  onChange={handleInputChange}
                ></textarea>
                <label htmlFor="address" className="label">Full Address*</label>
                {errors.address && <small className="error">{errors.address}</small>}
              </div>
            </div>

            <h2 className="section-title">Schedule</h2>
            <div className="grid">
              <div className="field">
                <input 
                  type="date" 
                  id="date"
                  name="date"
                  className="input" 
                  required 
                  placeholder=" "
                  value={formData.date}
                  onChange={handleInputChange}
                />
                <label htmlFor="date" className="label">Preferred Date*</label>
                {errors.date && <small className="error">{errors.date}</small>}
              </div>

              <div className="field">
                <input 
                  type="time" 
                  id="time"
                  name="time"
                  className="input" 
                  required 
                  placeholder=" " 
                  min="10:00" 
                  max="17:00" 
                  step="900"
                  value={formData.time}
                  onChange={handleInputChange}
                />
                <label htmlFor="time" className="label">Preferred Time (10:00–17:00)*</label>
                {errors.time && <small className="error">{errors.time}</small>}
              </div>
            </div>

            <div className="actions">
              <button type="submit" className="btn btn--primary">Book Appointment</button>
              <button type="button" className="btn btn--ghost" onClick={handleReset}>Reset</button>
            </div>
          </form>

          {/* ===== Review Panel ===== */}
          <aside className="review">
            <h3>Review & Confirm</h3>
            <ul className="review-list">
              <li><span>Hospital</span><strong>{hospitalInfo.name}</strong></li>
              <li><span>City</span><strong>{hospitalInfo.city}</strong></li>
              <li><span>Patient</span><strong>{formData.name || "—"}</strong></li>
              <li><span>Guardian</span><strong>{formData.guardian || "—"}</strong></li>
              <li><span>Phone</span><strong>{formData.phone || "—"}</strong></li>
              <li><span>Sex</span><strong>{formData.sex || "—"}</strong></li>
              <li><span>Age</span><strong>{formData.age || "—"}</strong></li>
              <li className="addr"><span>Address</span><strong>{formData.address || "—"}</strong></li>
              <li><span>Date</span><strong>{formData.date || "—"}</strong></li>
              <li><span>Time</span><strong>{formData.time || "—"}</strong></li>
            </ul>
            <div className="note">Please verify your details before booking.</div>
          </aside>
        </section>
      </main>

      {/* ===== Toast ===== */}
      <div className={`toast ${showToast ? 'show' : ''}`} role="status" aria-live="polite">
        <div className="toast__inner">
          <span className="tick">✔</span>
          <div>
            <strong>Appointment Request Sent!</strong>
            <div>{toastMessage}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;