import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../services/firebase';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const auth = getAuth(app);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Login Successful:', user);
      alert('Login Successful ✅');
      navigate('/home');
    } catch (error) {
      console.error('Login Error:', error);
      setError('Invalid email or password. Please try again.');
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      {/* BACKGROUND SLIDESHOW */}
      <div className="slideshow">
        <img src="/assets/login_1.png" alt="bg1" />
        <img src="/assets/login_2.png" alt="bg2" />
        <img src="/assets/login_3.png" alt="bg3" />
        <img src="/assets/login_4.png" alt="bg4" />
        <img src="/assets/login_5.png" alt="bg5" />
        <img src="/assets/login_6.png" alt="bg6" />
      </div>

      {/* LOGIN CARD */}
      <section className="login-card">
        {/* Header */}
        <div className="card-header">
          <h1 className="welcome-title">Welcome back</h1>
          <p className="welcome-subtitle">Log in to continue booking OPD appointments.</p>
        </div>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Email Field */}
        <div className="form-field">
          <label className="field-label">Email address</label>
          <input 
            type="email" 
            className="field-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="form-field">
          <label className="field-label">Password</label>
          <input 
            type="password" 
            className="field-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Forgot Password */}
        <div className="forgot-password">
          <a href="#" className="forgot-link">Forgot password?</a>
        </div>

        {/* Login Button */}
        <button 
          className="login-btn" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        {/* Signup Link */}
        <div className="signup-link">
          <span>New to MediQ? </span>
          <Link to="/signup">Create an account</Link>
        </div>
      </section>
    </main>
  );
};

export default Login;