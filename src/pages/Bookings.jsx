import React, { useState, useEffect } from 'react';
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
    name: 'Loading hospital...',
    city: 'Loading city...'
  });

  // State for UI
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Static tagline

  // Get hospital data from navigation state - IMPROVED
  useEffect(() => {
    console.log('📍 Checking location state:', location.state);
    
    if (location.state) {
      // Check all possible data formats from hospitals page
      const hospitalName = location.state.hospital || location.state.hospitalName || location.state.name;
      const cityName = location.state.city || location.state.cityName || location.state.location;
      
      if (hospitalName) {
        setHospitalInfo({
          name: hospitalName,
          city: cityName || 'City information not available'
        });
        console.log('✅ Hospital data set:', hospitalName, 'in', cityName);
      } else {
        console.warn('❌ No hospital name found in location state');
        setHospitalInfo({
          name: 'Hospital selection required',
          city: 'Please select a hospital first'
        });
      }
    } else {
      console.warn('❌ No location state received');
      setHospitalInfo({
        name: 'No hospital selected',
        city: 'Please go back and select a hospital'
      });
    }
  }, [location.state]);

  // Set minimum date to today
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const minDate = `${yyyy}-${mm}-${dd}`;
    
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

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validation - SIMPLIFIED
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter full name";
    }

    if (!formData.guardian.trim()) {
      newErrors.guardian = "Please enter father/husband name";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Enter valid 10-digit number";
    }

    if (!formData.sex) {
      newErrors.sex = "Please select";
    }

    const ageVal = Number(formData.age);
    if (!(ageVal >= 0 && ageVal <= 120)) {
      newErrors.age = "Enter valid age (0-120)";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Please enter address";
    }

    if (!formData.date) {
      newErrors.date = "Please pick a date";
    }

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

  // ✅ GOOGLE SHEETS INTEGRATION - OPTIMIZED
  const saveToGoogleSheets = async (bookingData) => {
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw3a3NPfCjO6oJ2bP8R3QkZ7hXvJ9YlLmNpOqRsTdE/exec';
    
    try {
      console.log('📤 Sending to Google Sheets...');
      
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      console.log('✅ Google Sheets response received');
      return { success: true };
      
    } catch (error) {
      console.error('❌ Google Sheets error:', error);
      return { success: false, error: error.message };
    }
  };

  // ✅ TOKEN FORM DOWNLOAD
  const downloadTokenForm = (bookingData) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size
      canvas.width = 800;
      canvas.height = 600;
      
      // Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Header
      ctx.fillStyle = '#1e66ff';
      ctx.fillRect(0, 0, canvas.width, 100);
      
      // Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('MEDIQ APPOINTMENT TOKEN', canvas.width/2, 45);
      
      // Token Number
      ctx.fillStyle = '#2fbf4a';
      ctx.font = 'bold 20px Arial';
      ctx.fillText(`TOKEN: ${bookingData.token}`, canvas.width/2, 75);
      
      // Hospital Info
      ctx.fillStyle = '#333333';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Hospital Details:', 50, 130);
      ctx.font = '16px Arial';
      ctx.fillText(`Hospital: ${bookingData.hospital}`, 70, 160);
      ctx.fillText(`City: ${bookingData.city}`, 70, 185);
      
      // Patient Details Section
      ctx.font = 'bold 18px Arial';
      ctx.fillText('Patient Details:', 50, 220);
      
      // Details List
      ctx.font = '16px Arial';
      let yPosition = 250;
      const details = [
        `Name: ${bookingData.name}`,
        `Guardian: ${bookingData.guardian}`,
        `Phone: ${bookingData.phone}`,
        `Sex: ${bookingData.sex}`,
        `Age: ${bookingData.age} years`,
        `Appointment Date: ${bookingData.date}`,
        `Appointment Time: ${bookingData.time}`,
        `Address: ${bookingData.address}`
      ];
      
      details.forEach(detail => {
        ctx.fillText(detail, 70, yPosition);
        yPosition += 30;
      });
      
      // Footer
      ctx.fillStyle = '#1e66ff';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Thank you for choosing MediQ - Your Health, Our Priority', canvas.width/2, canvas.height - 40);
      ctx.fillText('© 2025 MediQ Healthcare Solutions', canvas.width/2, canvas.height - 20);
      
      // Download as JPG
      setTimeout(() => {
        const link = document.createElement('a');
        link.download = `mediq-token-${bookingData.token}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 1.0);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('✅ Token form downloaded');
        resolve();
      }, 500);
    });
  };

  // ✅ BACKUP TO LOCAL STORAGE
  const saveToLocalStorage = (bookingData) => {
    const existingBookings = JSON.parse(localStorage.getItem('mediqBookings') || '[]');
    const newBooking = {
      ...bookingData,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    existingBookings.push(newBooking);
    localStorage.setItem('mediqBookings', JSON.stringify(existingBookings));
    console.log('✅ Data saved to local storage');
  };

  // ✅ MAIN FORM SUBMISSION HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🔄 Form submission started...');
    
    if (!validateForm()) {
      console.log('❌ Form validation failed');
      return;
    }

    setIsSaving(true);
    const token = "MQ" + Math.floor(100000 + Math.random() * 900000);
    
    const bookingData = {
      hospital: hospitalInfo.name,
      city: hospitalInfo.city,
      token: token,
      ...formData,
      timestamp: new Date().toISOString()
    };

    console.log('📦 Booking data:', bookingData);

    let sheetsSuccess = false;

    try {
      // 1. Try Google Sheets
      console.log('🔄 Saving to Google Sheets...');
      const sheetsResult = await saveToGoogleSheets(bookingData);
      sheetsSuccess = sheetsResult.success;
      
      // 2. Download token form
      console.log('🔄 Downloading token form...');
      await downloadTokenForm(bookingData);
      
      // 3. Save to local storage
      console.log('🔄 Saving to local storage...');
      saveToLocalStorage(bookingData);

      // 4. Show success message
      if (sheetsSuccess) {
        setToastMessage(`Appointment booked successfully! Token: ${token}. Data saved to Google Sheets.`);
      } else {
        setToastMessage(`Appointment booked successfully! Token: ${token}. Data saved locally.`);
      }
      
    } catch (error) {
      console.error('❌ Submission error:', error);
      setToastMessage(`Appointment booked! Token: ${token}. Error in data saving.`);
    }

    // UI Updates
    setShowToast(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Reset after delay
    setTimeout(() => {
      setShowToast(false);
      setIsSaving(false);
    }, 6000);

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
    }, 1000);
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
    navigate(-1);
  };

  return (
    <div className="bookings-page">
      {/* ===== Topbar / Tagline ===== */}
      <header className="topbar">
        <div className="topbar__inner">
          <div className="tagline-section">
            <h1>"Complete your details to book your OPD visit."</h1>
          </div>

          <div className="hospital-section">
            <div className="hospital-info">
              <div className="hospital-name">Hospital: {hospitalInfo.name}</div>
              <div className="city-name">City: {hospitalInfo.city}</div>
            </div>
            <button 
              className="btn btn--ghost change-hospital-btn" 
              onClick={handleBackToHospitals}
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
                  disabled={isSaving}
                />
                <label htmlFor="name" className="label">Full Name *</label>
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
                  disabled={isSaving}
                />
                <label htmlFor="guardian" className="label">Father/Husband Name *</label>
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
                  disabled={isSaving}
                />
                <label htmlFor="phone" className="label">Phone Number (10 digits) *</label>
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
                  disabled={isSaving}
                >
                  <option value="" disabled>Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                <label htmlFor="sex" className="label label--select">Sex *</label>
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
                  disabled={isSaving}
                />
                <label htmlFor="age" className="label">Age *</label>
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
                  disabled={isSaving}
                ></textarea>
                <label htmlFor="address" className="label">Full Address *</label>
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
                  disabled={isSaving}
                />
                <label htmlFor="date" className="label">Preferred Date *</label>
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
                  disabled={isSaving}
                />
                <label htmlFor="time" className="label">Preferred Time (10:00–17:00) *</label>
                {errors.time && <small className="error">{errors.time}</small>}
              </div>
            </div>

            <div className="actions">
              <button 
                type="submit" 
                className="btn btn--primary" 
                disabled={isSaving}
              >
                {isSaving ? 'Saving Appointment...' : 'Book Appointment'}
              </button>
              <button 
                type="button" 
                className="btn btn--ghost" 
                onClick={handleReset}
                disabled={isSaving}
              >
                Reset Form
              </button>
            </div>
          </form>

          {/* ===== Review Panel ===== */}
          <aside className="review">
            <h3>Review & Confirm</h3>
            <ul className="review-list">
              <li><span>Hospital</span><strong>{hospitalInfo.name}</strong></li>
              <li><span>City</span><strong>{hospitalInfo.city}</strong></li>
              <li><span>Patient Name</span><strong>{formData.name || "—"}</strong></li>
              <li><span>Guardian Name</span><strong>{formData.guardian || "—"}</strong></li>
              <li><span>Phone Number</span><strong>{formData.phone || "—"}</strong></li>
              <li><span>Sex</span><strong>{formData.sex || "—"}</strong></li>
              <li><span>Age</span><strong>{formData.age || "—"}</strong></li>
              <li className="addr"><span>Address</span><strong>{formData.address || "—"}</strong></li>
              <li><span>Appointment Date</span><strong>{formData.date || "—"}</strong></li>
              <li><span>Appointment Time</span><strong>{formData.time || "—"}</strong></li>
            </ul>
            <div className="note">Please verify all details before booking. Token form will download automatically.</div>
          </aside>
        </section>
      </main>

      {/* ===== Toast ===== */}
      <div className={`toast ${showToast ? 'show' : ''}`} role="status" aria-live="polite">
        <div className="toast__inner">
          <span className="tick">✓</span>
          <div>
            <strong>Appointment Booked Successfully!</strong>
            <div>{toastMessage}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;