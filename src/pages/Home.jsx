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
  const [modalData, setModalData] = useState({});
  const [showTipModal, setShowTipModal] = useState(false);
  const [tipModalData, setTipModalData] = useState({});

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
      detailedContent: {
        benefits: [
          "Improves skin health and complexion",
          "Boosts energy levels and reduces fatigue",
          "Aids in digestion and prevents constipation",
          "Helps in weight management",
          "Regulates body temperature"
        ],
        tips: [
          "Carry a water bottle with you throughout the day",
          "Set hourly reminders to drink water",
          "Add lemon or mint for flavor if needed",
          "Drink water before meals to control appetite",
          "Monitor urine color - pale yellow indicates good hydration"
        ],
        recommendation: "Aim for 2-3 liters of water daily, adjusting based on activity level and climate."
      },
      icon: "💧"
    },
    {
      id: 2,
      title: "Regular Exercise Routine",
      description: "30 minutes of daily physical activity improves heart health and boosts immunity.",
      detailedContent: {
        benefits: [
          "Strengthens cardiovascular system",
          "Reduces risk of chronic diseases",
          "Improves mental health and mood",
          "Enhances sleep quality",
          "Increases longevity"
        ],
        tips: [
          "Start with 15-20 minutes and gradually increase",
          "Mix cardio, strength training, and flexibility exercises",
          "Find activities you enjoy - dancing, swimming, cycling",
          "Use stairs instead of elevator when possible",
          "Take short walking breaks during work"
        ],
        recommendation: "Combine 150 minutes of moderate aerobic activity with strength training twice weekly."
      },
      icon: "🏃‍♂️"
    },
    {
      id: 3,
      title: "Balanced Nutrition",
      description: "Include fruits, vegetables, proteins and whole grains for complete nutrition.",
      detailedContent: {
        benefits: [
          "Provides essential vitamins and minerals",
          "Supports immune function",
          "Maintains healthy weight",
          "Reduces disease risk",
          "Improves energy and focus"
        ],
        tips: [
          "Fill half your plate with vegetables and fruits",
          "Choose whole grains over refined carbohydrates",
          "Include lean protein sources",
          "Limit processed foods and added sugars",
          "Practice mindful eating"
        ],
        recommendation: "Follow the 'rainbow plate' approach - include foods of different colors for varied nutrients."
      },
      icon: "🥗"
    },
    {
      id: 4,
      title: "Quality Sleep Matters",
      description: "7-8 hours of uninterrupted sleep helps in recovery and mental clarity.",
      detailedContent: {
        benefits: [
          "Enhances memory and learning",
          "Supports immune function",
          "Regulates hormones and metabolism",
          "Improves mood and emotional regulation",
          "Promotes physical repair and recovery"
        ],
        tips: [
          "Maintain consistent sleep schedule",
          "Create a dark, quiet, and cool sleep environment",
          "Avoid screens 1 hour before bedtime",
          "Limit caffeine intake in the afternoon",
          "Establish relaxing pre-sleep routine"
        ],
        recommendation: "Aim for 7-9 hours of quality sleep each night for optimal health benefits."
      },
      icon: "😴"
    },
    {
      id: 5,
      title: "Stress Management",
      description: "Practice meditation and mindfulness to reduce stress and improve mental health.",
      detailedContent: {
        benefits: [
          "Lowers blood pressure and heart rate",
          "Reduces anxiety and depression symptoms",
          "Improves focus and concentration",
          "Enhances emotional resilience",
          "Boosts overall well-being"
        ],
        tips: [
          "Practice deep breathing exercises daily",
          "Try 10-minute meditation sessions",
          "Take regular breaks during work",
          "Engage in hobbies and creative activities",
          "Connect with supportive friends and family"
        ],
        recommendation: "Incorporate at least 15 minutes of stress-reducing activities into your daily routine."
      },
      icon: "🧘‍♀️"
    },
    {
      id: 6,
      title: "Preventive Checkups",
      description: "Regular health screenings help in early detection and prevention of diseases.",
      detailedContent: {
        benefits: [
          "Early detection of health issues",
          "Prevention of disease progression",
          "Better treatment outcomes",
          "Reduced healthcare costs long-term",
          "Peace of mind and health awareness"
        ],
        tips: [
          "Schedule annual physical examinations",
          "Keep track of family medical history",
          "Follow age-appropriate screening guidelines",
          "Maintain vaccination schedules",
          "Monitor blood pressure and cholesterol regularly"
        ],
        recommendation: "Consult with your healthcare provider to create a personalized preventive care plan."
      },
      icon: "🩺"
    }
  ];

  // Typing animation: Slowed down speed
  useEffect(() => {
    let timeoutId;

    const typeTagline = () => {
      const currentTagline = taglines[taglineIndex];

      if (typing) {
        if (charIndex < currentTagline.length) {
          setCurrentText(currentTagline.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
          timeoutId = setTimeout(typeTagline, 100);
        } else {
          timeoutId = setTimeout(() => setTyping(false), 1000);
        }
      } else {
        if (charIndex > 0) {
          setCurrentText(currentTagline.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
          timeoutId = setTimeout(typeTagline, 100);
        } else {
          setTyping(true);
          setTaglineIndex((prev) => (prev + 1) % taglines.length);
          timeoutId = setTimeout(typeTagline, 700);
        }
      }
    };

    timeoutId = setTimeout(typeTagline, 100);

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
    setTipModalData(tip);
    setShowTipModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeTipModal = () => {
    setShowTipModal(false);
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
        <h2 id="hi">Common Health Issues</h2>
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
        <h2 id='hi'>Health Tips & Articles</h2>
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

      {/* ================ HEALTH ISSUES MODAL ================= */}
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

      {/* ================ HEALTH TIPS MODAL ================= */}
      {showTipModal && (
        <div id="tip-modal" className="modal" style={{ display: 'flex' }} onClick={closeTipModal}>
          <div className="modal-content tip-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeTipModal}>&times;</span>
            
            <div className="tip-modal-header">
              <div className="tip-modal-icon">{tipModalData.icon}</div>
              <h2 id="tip-modal-title">{tipModalData.title}</h2>
            </div>
            
            <div className="tip-modal-description">
              <p>{tipModalData.description}</p>
            </div>

            <div className="tip-modal-section">
              <h3>Key Benefits</h3>
              <ul className="tip-modal-list">
                {tipModalData.detailedContent?.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="tip-modal-section">
              <h3>Practical Tips</h3>
              <ul className="tip-modal-list">
                {tipModalData.detailedContent?.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="tip-modal-recommendation">
              <h3>Expert Recommendation</h3>
              <p>{tipModalData.detailedContent?.recommendation}</p>
            </div>
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