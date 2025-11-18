import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AboutUs from './pages/AboutUs';
import Outer from './pages/Outer';
import Hospitals from './pages/Hospitals';
import Bookings from './pages/Bookings';

function App() {
  // Temporary - baad me isko proper authentication se replace karna
  const isAuthenticated = true; // Default false rakho taaki har koi pehle Outer page dekh sake

  return (
    <Router>
      <Routes>
        {/* Root path par Outer page show hoga */}
        <Route path="/" element={<Outer />} />
        
        {/* Home page ko protect karo - agar authenticated nahi hai to login par redirect */}
        <Route 
          path="/home" 
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
        />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/outer" element={<Outer />} />
        
        {/* Hospitals routes bhi protect kar sakte ho agar chahe to */}
        <Route path="/hospitals" element={<Hospitals />} />
        
        {/* Bookings page bhi protect karo - only logged in users can access */}
        <Route 
          path="/bookings" 
          element={isAuthenticated ? <Bookings /> : <Navigate to="/login" />} 
        />
        
        {/* City specific routes */}
        <Route path="/chandigarh" element={<Hospitals city="Chandigarh" />} />
        <Route path="/delhi" element={<Hospitals city="Delhi" />} />
        <Route path="/mumbai" element={<Hospitals city="Mumbai" />} />
        <Route path="/bangalore" element={<Hospitals city="Bangalore" />} />
        <Route path="/chennai" element={<Hospitals city="Chennai" />} />
        <Route path="/pune" element={<Hospitals city="Pune" />} />
        <Route path="/gurgaon" element={<Hospitals city="Gurgaon" />} />
        <Route path="/ludhiana" element={<Hospitals city="Ludhiana" />} />
        <Route path="/shimla" element={<Hospitals city="Shimla" />} />
      </Routes>
    </Router>
  );
}

export default App;