import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const [currentText, setCurrentText] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({}); // FIX: Initialized correctly to an empty object

  const taglines = [
    "Select your city to find nearby hospitals.",
    "Healthcare made simple with MediQ."
  ];

  const cities = ["Delhi", "Mumbai", "Pune", "Chennai", "Chandigarh", "Bangalore", "Gurgaon", "Shimla", "Ludhiana"];

  const issues = {
    teeth: {
      title: "Teeth Pain",
      precautions: ["Brush twice daily", "Avoid too much sugar", "Regular dental checkups"],
      treatment: "Warm salt water rinse, clove oil. Visit dentist if persistent."
    },
    stomach: {
      title: "Stomach Pain",
      precautions: ["Eat light meals", "Avoid spicy food", "Stay hydrated"],
      treatment: "ORS solution, bland diet, consult doctor if severe."
    },
    cold: {
      title: "Common Cold",
      precautions: ["Wash hands often", "Avoid cold drinks", "Wear warm clothes"],
      treatment: "Ginger tea, steam inhalation, rest well."
    },
    headache: {
      title: "Headache",
      precautions: ["Avoid stress", "Stay hydrated", "Maintain posture"],
      treatment: "Rest, hydration, mild pain relievers if required."
    },
    fever: {
      title: "Fever",
      precautions: ["Drink fluids", "Take rest", "Monitor temperature"],
      treatment: "Paracetamol, sponge bath, consult doctor if persists."
    },
    acidity: {
      title: "Acidity",
      precautions: [
        "Avoid spicy and oily food",
        "Eat smaller and frequent meals",
        "Do not lie down immediately after eating",
        "Limit caffeine and alcohol intake"
      ],
      treatment: "Drink cold milk, take antacids if necessary, and consult a doctor if the problem persists."
    }
  };

  const healthTips = [
    {
      id: 1,
      title: "Stay Hydrated Daily",
      description: "Drink 8-10 glasses of water every day to maintain optimal body functions and flush out toxins.",
      icon: "💧"
    },
    {
      id: 2,
      title: "Regular Exercise Routine",
      description: "30 minutes of daily physical activity improves heart health and boosts immunity.",
      icon: "🏃‍♂️"
    },
    {
      id: 3,
      title: "Balanced Nutrition",
      description: "Include fruits, vegetables, proteins and whole grains for complete nutrition.",
      icon: "🥗"
    },
    {
      id: 4,
      title: "Quality Sleep Matters",
      description: "7-8 hours of uninterrupted sleep helps in recovery and mental clarity.",
      icon: "😴"
    },
    {
      id: 5,
      title: "Stress Management",
      description: "Practice meditation and mindfulness to reduce stress and improve mental health.",
      icon: "🧘‍♀️"
    },
    {
      id: 6,
      title: "Preventive Checkups",
      description: "Regular health screenings help in early detection and prevention of diseases.",
      icon: "🩺"
    }
  ];

  // Typing animation: Slowed down speed

useEffect(() => {
  let timeoutId;

  const typeTagline = () => {
    const currentTagline = taglines[taglineIndex];

    if (typing) {
      // Typing characters (3s total ≈ 100ms/char)
      if (charIndex < currentTagline.length) {
        setCurrentText(currentTagline.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        timeoutId = setTimeout(typeTagline, 100);
      } else {
        // Wait 1s after full line
        timeoutId = setTimeout(() => setTyping(false), 1000);
      }
    } else {
      // Deleting characters (2.5s total ≈ 80ms/char)
      if (charIndex > 0) {
        setCurrentText(currentTagline.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        timeoutId = setTimeout(typeTagline, 80);
      } else {
        // Move to next tagline after short pause
        setTyping(true);
        setTaglineIndex((prev) => (prev + 1) % taglines.length);
        timeoutId = setTimeout(typeTagline, 700);
      }
    }
  };

  timeoutId = setTimeout(typeTagline, 400);

  return () => clearTimeout(timeoutId);
}, [charIndex, typing, taglineIndex]);

  const handleCitySearch = (query) => {
    setCityQuery(query);
    setShowSuggestions(query.length > 0);
  };

  const handleCitySelect = (city) => {
    setCityQuery(city);
    setShowSuggestions(false);

    navigate('/hospitals', {
      state: { selectedCity: city }
    });
  };

  const handleHealthCardClick = (issue) => {
    setModalData(issues[issue]);
    setShowModal(true);
  };

  const handleReadMore = (tip) => {
    alert(`More information about: ${tip.title}\n\n${tip.description}`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(cityQuery.toLowerCase())
  );

  const healthIssues = [
    { id: 'teeth', name: 'Teeth Pain', color: '#FF6B6B' },
    { id: 'stomach', name: 'Stomach Pain', color: '#4ECDC4' },
    { id: 'cold', name: 'Common Cold', color: '#45B7D1' },
    { id: 'headache', name: 'Headache', color: '#96CEB4' },
    { id: 'fever', name: 'Fever', color: '#FFEAA7' },
    { id: 'acidity', name: 'Acidity', color: '#DDA0DD' }
  ];

  return (
    <div className="home-page">
      {/* ================ NAVBAR ================= */}
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/aboutus">About Us</Link>
        </div>
        <div className="nav-right">
          <Link to="/">
            <img src="/assets/MediQ_Logo.png" alt="MediQ Logo" className="logo" />
          </Link>
        </div>
      </nav>

      {/* ================ HERO / TAGLINE ================= */}
      <header className="hero">
        <div className="hero-content">
          <h1 id="tagline-text">{currentText}</h1>
          <p className="subtext">Find hospitals near you & book appointments instantly.</p>
        </div>
      </header>

      {/* ================ CITY SEARCH ================= */}
      <section className="search-section">
        <h2>Search Your City</h2>
        <input
          type="text"
          id="city-search"
          placeholder="Type your city..."
          value={cityQuery}
          onChange={(e) => handleCitySearch(e.target.value)}
        />
        {showSuggestions && (
          <ul id="city-suggestions" className="suggestions">
            {filteredCities.map(city => (
              <li key={city} onClick={() => handleCitySelect(city)}>
                {city}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ================ HEALTH ISSUES ================= */}
      <section className="health-section">
        <h2>Common Health Issues</h2>
        <div className="health-grid">
          {healthIssues.map((issue) => (
            <div
              key={issue.id}
              className="health-card"
              style={{
                backgroundImage: `url(/assets/health_${healthIssues.indexOf(issue) + 1}.png)`,
                backgroundColor: issue.color
              }}
              data-issue={issue.id}
              data-issue-name={issue.name}
              onClick={() => handleHealthCardClick(issue.id)}
            >
              <div className="health-fallback">
                <div className="fallback-icon">{issue.name.charAt(0)}</div>
                <div className="fallback-text">{issue.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================ HEALTH TIPS SECTION ================= */}
      <section className="health-tips-section">
        <h2>Health Tips & Articles</h2>
        <p className="section-subtitle">Expert advice for maintaining good health</p>
        <div className="tips-grid">
          {healthTips.map(tip => (
            <div key={tip.id} className="tip-card">
              <div className="tip-icon">{tip.icon}</div>
              <h3>{tip.title}</h3>
              <p>{tip.description}</p>
              <button
                className="read-more-btn"
                onClick={() => handleReadMore(tip)}
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================ MODAL ================= */}
      {showModal && (
        <div id="modal" className="modal" style={{ display: 'flex' }} onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <h2 id="modal-title">{modalData.title}</h2>
            <h3>Precautions:</h3>
            <ul id="modal-precautions">
              {modalData.precautions?.map((precaution, index) => (
                <li key={index}>{precaution}</li>
              ))}
            </ul>
            <h3>Treatment:</h3>
            <p id="modal-treatment">{modalData.treatment}</p>
          </div>
        </div>
      )}

      {/* ================ FOOTER ================= */}
      <footer className="footer">
        <p>© 2025 MediQ | Stay Healthy, Stay Safe 💙</p>
      </footer>
    </div>
  );
};

export default Home;