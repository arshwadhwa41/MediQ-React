import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../services/firebase';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const auth = getAuth(app);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      const user = userCredential.user;
      console.log('Signup Successful:', user);
      alert('Account Created Successfully ✅');
      navigate('/home');
    } catch (error) {
      console.error('Signup Error:', error);
      setError(error.message);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signup-page">
      {/* BACKGROUND SLIDESHOW */}
      <div className="slideshow">
        <img src="/assets/login_1.png" alt="bg1" />
        <img src="/assets/login_2.png" alt="bg2" />
        <img src="/assets/login_3.png" alt="bg3" />
        <img src="/assets/login_4.png" alt="bg4" />
        <img src="/assets/login_5.png" alt="bg5" />
        <img src="/assets/login_6.png" alt="bg6" />
      </div>

      {/* SIGNUP CARD */}
      <section className="signup-card">
        {/* Header */}
        <div className="card-header">
          <h1 className="welcome-title">Create your account</h1>
          <p className="welcome-subtitle">Sign up to start booking OPD appointments.</p>
        </div>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Form Section */}
        <div className="form-section">
          {/* Full Name Field */}
          <div className="form-field">
            <label className="field-label">Full Name</label>
            <input 
              type="text" 
              name="fullName"
              className="field-input"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-field">
            <label className="field-label">Email address</label>
            <input 
              type="email" 
              name="email"
              className="field-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-field">
            <label className="field-label">Password</label>
            <input 
              type="password" 
              name="password"
              className="field-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="form-field">
            <label className="field-label">Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              className="field-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Sign Up Button */}
          <button 
            className="signup-btn" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          {/* Login Link */}
          <div className="login-link">
            <span>Already have an account? </span>
            <Link to="/login">Log in</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;