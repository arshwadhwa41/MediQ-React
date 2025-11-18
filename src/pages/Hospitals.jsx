import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './Hospitals.css';

const Hospitals = () => {
  const { city } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [taglineText, setTaglineText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Get selected city from URL params OR from location state
  const selectedCity = city || location.state?.selectedCity?.toLowerCase() || 'chandigarh';

  // 50+ Cities ka comprehensive data
  const citiesData = {
    chandigarh: {
      name: "Chandigarh",
      hospitals: [
        {
          id: 1,
          name: "Fortis Hospital, Mohali",
          image: "/assets/fortis.webp",
          specialties: ["Cardiac Sciences", "Oncology", "Orthopaedics", "Neurosciences", "Robotic Surgery"]
        },
        {
          id: 2,
          name: "Max Super Speciality Hospital, Mohali", 
          image: "/assets/max.jfif",
          specialties: ["Cancer Care", "Cardiac Sciences", "Orthopaedics", "Kidney Transplant", "Gastroenterology"]
        },
        {
          id: 3,
          name: "PGIMER, Chandigarh",
          image: "/assets/pgimer.webp", 
          specialties: ["Cardiology", "Nephrology", "Oncology", "Hepatology", "Orthopaedics"]
        },
        {
          id: 4,
          name: "Sohana Hospital, Mohali",
          image: "/assets/sohana.webp",
          specialties: ["Orthopaedics", "Oncology", "Cardiology", "Neurosciences", "Ophthalmology"]
        },
        {
          id: 5,
          name: "Paras Hospitals, Panchkula",
          image: "/assets/paras.jpg",
          specialties: ["Cardiology", "Oncology", "Nephrology", "Gastroenterology", "Orthopaedics"]
        }
      ]
    },

    delhi: {
      name: "Delhi",
      hospitals: [
        {
          id: 1,
          name: "Apollo Hospital, Sarita Vihar",
          image: "/assets/hospitals/apollo-delhi.jpg",
          specialties: ["Cardiology", "Neurology", "Orthopedics", "Oncology", "Transplant"]
        },
        {
          id: 2,
          name: "Max Super Specialty Hospital, Saket",
          image: "/assets/hospitals/max-delhi.jpg",
          specialties: ["Oncology", "Cardiac Sciences", "Neurosciences", "Orthopedics", "Emergency"]
        },
        {
          id: 3,
          name: "Fortis Escorts Heart Institute",
          image: "/assets/fortis.webp",
          specialties: ["Cardiac Surgery", "Cardiology", "CTVS", "Heart Transplant", "Vascular Surgery"]
        },
        {
          id: 4,
          name: "AIIMS Delhi",
          image: "/assets/hospitals/aiims-delhi.jpg",
          specialties: ["All Specialties", "Research", "Medical Education", "Super Specialty Care"]
        },
        {
          id: 5,
          name: "Sir Ganga Ram Hospital",
          image: "/assets/hospitals/ganga-ram.jpg",
          specialties: ["Gastroenterology", "Nephrology", "Cardiology", "Orthopedics", "Oncology"]
        }
      ]
    },

    mumbai: {
      name: "Mumbai", 
      hospitals: [
        {
          id: 1,
          name: "Lilavati Hospital, Bandra",
          image: "/assets/hospitals/lilavati-mumbai.jpg",
          specialties: ["Cardiac", "Neuro", "Oncology", "Orthopedics", "Transplant"]
        },
        {
          id: 2,
          name: "Nanavati Hospital, Vile Parle",
          image: "/assets/hospitals/nanavati.jpg",
          specialties: ["Cardiology", "Oncology", "Neurosurgery", "Orthopedics", "Renal Sciences"]
        },
        {
          id: 3,
          name: "Kokilaben Hospital, Andheri",
          image: "/assets/hospitals/kokilaben.jpg",
          specialties: ["Cardiac Sciences", "Oncology", "Neurosciences", "Transplant", "Robotic Surgery"]
        },
        {
          id: 4,
          name: "Jaslok Hospital, Pedder Road",
          image: "/assets/hospitals/jaslok.jpg",
          specialties: ["Cardiology", "Oncology", "Endocrinology", "Gastroenterology", "Orthopedics"]
        },
        {
          id: 5,
          name: "Fortis Hospital, Mulund",
          image: "/assets/fortis.webp",
          specialties: ["Cardiac Care", "Oncology", "Orthopedics", "Neuro Sciences", "Emergency Care"]
        }
      ]
    },

    bangalore: {
      name: "Bangalore",
      hospitals: [
        {
          id: 1,
          name: "Manipal Hospital, Old Airport Road",
          image: "/assets/hospitals/manipal-blr.jpg",
          specialties: ["Cardiac Sciences", "Neurosciences", "Oncology", "Orthopedics", "Transplant"]
        },
        {
          id: 2,
          name: "Fortis Hospital, Bannerghatta Road",
          image: "/assets/fortis.webp",
          specialties: ["Cardiology", "Oncology", "Orthopedics", "Neuro Sciences", "Gastroenterology"]
        },
        {
          id: 3,
          name: "Apollo Hospital, Bannerghatta Road",
          image: "/assets/hospitals/apollo-blr.jpg",
          specialties: ["Cardiac Sciences", "Oncology", "Neurology", "Orthopedics", "Nephrology"]
        },
        {
          id: 4,
          name: "Narayana Health, Bommasandra",
          image: "/assets/hospitals/narayana.jpg",
          specialties: ["Cardiac Surgery", "Neurosurgery", "Oncology", "Orthopedics", "Transplant"]
        },
        {
          id: 5,
          name: "Columbia Asia Hospital, Yeshwanthpur",
          image: "/assets/hospitals/columbia-asia.jpg",
          specialties: ["Internal Medicine", "Surgery", "Pediatrics", "Gynecology", "Emergency Care"]
        }
      ]
    },

    chennai: {
      name: "Chennai",
      hospitals: [
        {
          id: 1,
          name: "Apollo Hospitals, Greams Road",
          image: "/assets/hospitals/apollo-chennai.jpg",
          specialties: ["Cardiac Sciences", "Transplant", "Oncology", "Neurology", "Orthopedics"]
        },
        {
          id: 2,
          name: "Fortis Malar Hospital, Adyar",
          image: "/assets/fortis.webp",
          specialties: ["Cardiology", "Oncology", "Neuro Sciences", "Orthopedics", "Gastroenterology"]
        },
        {
          id: 3,
          name: "MIOT International, Manapakkam",
          image: "/assets/hospitals/miot.jpg",
          specialties: ["Orthopedics", "Transplant", "Oncology", "Cardiac Sciences", "Neuro Sciences"]
        },
        {
          id: 4,
          name: "Global Hospitals, Perumbakkam",
          image: "/assets/hospitals/global-hospitals.jpg",
          specialties: ["Multi Organ Transplant", "Gastroenterology", "Oncology", "Neuro Sciences", "Cardiology"]
        },
        {
          id: 5,
          name: "Billroth Hospitals, Shenoy Nagar",
          image: "/assets/hospitals/billroth.jpg",
          specialties: ["Gastroenterology", "Cardiology", "Nephrology", "Orthopedics", "General Surgery"]
        }
      ]
    },

    pune: {
      name: "Pune",
      hospitals: [
        {
          id: 1,
          name: "Ruby Hall Clinic, Pune",
          image: "/assets/hospitals/ruby-hall.jpg",
          specialties: ["Cardiology", "Oncology", "Orthopedics", "Neuro Sciences", "Transplant"]
        },
        {
          id: 2,
          name: "Jehangir Hospital, Pune",
          image: "/assets/hospitals/jehangir.jpg",
          specialties: ["Internal Medicine", "Surgery", "Pediatrics", "Gynecology", "Emergency Care"]
        },
        {
          id: 3,
          name: "Sahyadri Hospital, Deccan Gymkhana",
          image: "/assets/hospitals/sahyadri.jpg",
          specialties: ["Neuro Sciences", "Cardiac Sciences", "Oncology", "Orthopedics", "Gastroenterology"]
        },
        {
          id: 4,
          name: "Columbia Asia Hospital, Kharadi",
          image: "/assets/hospitals/columbia-asia.jpg",
          specialties: ["General Medicine", "Surgery", "Pediatrics", "Gynecology", "Emergency"]
        },
        {
          id: 5,
          name: "Noble Hospital, Hadapsar",
          image: "/assets/hospitals/noble-hospital.jpg",
          specialties: ["Cardiology", "Orthopedics", "Neurology", "Oncology", "General Surgery"]
        }
      ]
    },

    hyderabad: {
      name: "Hyderabad",
      hospitals: [
        {
          id: 1,
          name: "Apollo Hospitals, Jubilee Hills",
          image: "/assets/hospitals/apollo-hyd.jpg",
          specialties: ["Cardiac Sciences", "Transplant", "Oncology", "Neuro Sciences", "Orthopedics"]
        },
        {
          id: 2,
          name: "Yashoda Hospitals, Somajiguda",
          image: "/assets/hospitals/yashoda.jpg",
          specialties: ["Oncology", "Cardiac Sciences", "Neuro Sciences", "Orthopedics", "Transplant"]
        },
        {
          id: 3,
          name: "KIMS Hospitals, Secunderabad",
          image: "/assets/hospitals/kims.jpg",
          specialties: ["Cardiology", "Neuro Sciences", "Oncology", "Orthopedics", "Gastroenterology"]
        },
        {
          id: 4,
          name: "Continental Hospitals, Gachibowli",
          image: "/assets/hospitals/continental.jpg",
          specialties: ["Multi Organ Transplant", "Oncology", "Cardiac Sciences", "Neuro Sciences", "Orthopedics"]
        },
        {
          id: 5,
          name: "Care Hospitals, Banjara Hills",
          image: "/assets/hospitals/care-hospitals.jpg",
          specialties: ["Cardiac Sciences", "Neuro Sciences", "Oncology", "Orthopedics", "Nephrology"]
        }
      ]
    },

    kolkata: {
      name: "Kolkata",
      hospitals: [
        {
          id: 1,
          name: "Apollo Gleneagles Hospitals, EM Bypass",
          image: "/assets/hospitals/apollo-kolkata.jpg",
          specialties: ["Cardiac Sciences", "Oncology", "Neuro Sciences", "Orthopedics", "Transplant"]
        },
        {
          id: 2,
          name: "AMRI Hospitals, Dhakuria",
          image: "/assets/hospitals/amri.jpg",
          specialties: ["Cardiology", "Oncology", "Neuro Sciences", "Orthopedics", "Emergency Care"]
        },
        {
          id: 3,
          name: "Fortis Hospital, Anandapur",
          image: "/assets/fortis.webp",
          specialties: ["Cardiac Care", "Oncology", "Orthopedics", "Neuro Sciences", "Gastroenterology"]
        },
        {
          id: 4,
          name: "Peerless Hospital, Panchasayar",
          image: "/assets/hospitals/peerless.jpg",
          specialties: ["Cardiology", "Oncology", "Orthopedics", "Neuro Sciences", "General Surgery"]
        },
        {
          id: 5,
          name: "Ruby General Hospital, Kasba",
          image: "/assets/hospitals/ruby-general.jpg",
          specialties: ["Cardiology", "Orthopedics", "Neurology", "Oncology", "General Medicine"]
        }
      ]
    },

    ahmedabad: {
      name: "Ahmedabad",
      hospitals: [
        {
          id: 1,
          name: "Apollo Hospitals, Ahmedabad",
          image: "/assets/hospitals/apollo-ahmedabad.jpg",
          specialties: ["Cardiac Sciences", "Oncology", "Neuro Sciences", "Orthopedics", "Nephrology"]
        },
        {
          id: 2,
          name: "Sterling Hospitals, Ahmedabad",
          image: "/assets/hospitals/sterling.jpg",
          specialties: ["Cardiology", "Orthopedics", "Neuro Sciences", "Oncology", "Gastroenterology"]
        },
        {
          id: 3,
          name: "CIMS Hospital, Ahmedabad",
          image: "/assets/hospitals/cims.jpg",
          specialties: ["Cardiac Sciences", "Oncology", "Neuro Sciences", "Orthopedics", "Transplant"]
        },
        {
          id: 4,
          name: "Sal Hospital, Ahmedabad",
          image: "/assets/hospitals/sal-hospital.jpg",
          specialties: ["Cardiology", "Orthopedics", "Neurology", "Oncology", "General Surgery"]
        },
        {
          id: 5,
          name: "Zydus Hospitals, Ahmedabad",
          image: "/assets/hospitals/zydus.jpg",
          specialties: ["Multi Speciality", "Emergency Care", "Surgery", "Medicine", "Critical Care"]
        }
      ]
    },

    gurgaon: {
      name: "Gurgaon",
      hospitals: [
        {
          id: 1,
          name: "Medanta The Medicity, Gurgaon",
          image: "/assets/hospitals/medanta.jpg",
          specialties: ["Cardiac Sciences", "Neuro Sciences", "Oncology", "Orthopedics", "Transplant"]
        },
        {
          id: 2,
          name: "Fortis Memorial Research Institute, Gurgaon",
          image: "/assets/fortis.webp",
          specialties: ["Oncology", "Cardiac Sciences", "Neuro Sciences", "Orthopedics", "Emergency Care"]
        },
        {
          id: 3,
          name: "Artemis Hospitals, Gurgaon",
          image: "/assets/hospitals/artemis.jpg",
          specialties: ["Cardiology", "Orthopedics", "Neuro Sciences", "Oncology", "Gastroenterology"]
        },
        {
          id: 4,
          name: "Paras Hospitals, Gurgaon",
          image: "/assets/paras.jpg",
          specialties: ["Cardiology", "Neurology", "Orthopedics", "Oncology", "General Surgery"]
        },
        {
          id: 5,
          name: "Columbia Asia Hospital, Gurgaon",
          image: "/assets/hospitals/columbia-asia.jpg",
          specialties: ["General Medicine", "Surgery", "Pediatrics", "Gynecology", "Emergency"]
        }
      ]
    },

    noida: {
      name: "Noida",
      hospitals: [
        {
          id: 1,
          name: "Fortis Hospital, Noida",
          image: "/assets/fortis.webp",
          specialties: ["Cardiac Care", "Oncology", "Orthopedics", "Neuro Sciences", "Emergency Care"]
        },
        {
          id: 2,
          name: "Kailash Hospital, Noida",
          image: "/assets/hospitals/kailash.jpg",
          specialties: ["Cardiology", "Orthopedics", "Neurology", "General Surgery", "Emergency"]
        },
        {
          id: 3,
          name: "Jaypee Hospital, Noida",
          image: "/assets/hospitals/jaypee.jpg",
          specialties: ["Cardiac Sciences", "Neuro Sciences", "Oncology", "Orthopedics", "Transplant"]
        },
        {
          id: 4,
          name: "Metro Hospital, Noida",
          image: "/assets/hospitals/metro-hospital.jpg",
          specialties: ["Cardiology", "Orthopedics", "Neurology", "Oncology", "General Medicine"]
        },
        {
          id: 5,
          name: "Apollo Hospitals, Noida",
          image: "/assets/hospitals/apollo-noida.jpg",
          specialties: ["Cardiac Sciences", "Oncology", "Neuro Sciences", "Orthopedics", "Nephrology"]
        }
      ]
    },

    lucknow: {
      name: "Lucknow",
      hospitals: [
        {
          id: 1,
          name: "Sanjay Gandhi Post Graduate Institute",
          image: "/assets/hospitals/sgpgj.jpg",
          specialties: ["Super Specialty", "Research", "Medical Education", "Advanced Care"]
        },
        {
          id: 2,
          name: "Apollo Hospitals, Lucknow",
          image: "/assets/hospitals/apollo-lucknow.jpg",
          specialties: ["Cardiac Sciences", "Oncology", "Neuro Sciences", "Orthopedics", "Nephrology"]
        },
        {
          id: 3,
          name: "Fortis Hospital, Lucknow",
          image: "/assets/fortis.webp",
          specialties: ["Cardiac Care", "Oncology", "Orthopedics", "Neuro Sciences", "Emergency Care"]
        }
      ]
    },

    ludhiana: {
      name: "Ludhiana",
      hospitals: [
        {
          id: 1,
          name: "Dayanand Medical College & Hospital",
          image: "/assets/hospitals/dmch.jpg",
          specialties: ["Multi Speciality", "Medical Education", "Research", "Advanced Care"]
        },
        {
          id: 2,
          name: "SPS Hospitals, Ludhiana",
          image: "/assets/hospitals/sps.jpg",
          specialties: ["Cardiology", "Orthopedics", "Neurology", "Oncology", "General Surgery"]
        }
      ]
    },

    shimla: {
      name: "Shimla",
      hospitals: [
        {
          id: 1,
          name: "Indira Gandhi Medical College & Hospital",
          image: "/assets/hospitals/igmc.jpg",
          specialties: ["Multi Speciality", "Medical Education", "Government Hospital", "Emergency Care"]
        },
        {
          id: 2,
          name: "Kamla Nehru Hospital, Shimla",
          image: "/assets/hospitals/kamla-nehru.jpg",
          specialties: ["General Medicine", "Surgery", "Pediatrics", "Gynecology", "Emergency"]
        }
      ]
    }
  };
    // Get current city data
  const cityData = citiesData[selectedCity] || citiesData.chandigarh;
  const tagline = `Hospitals Available in ${cityData.name} For You 24/7 !`;

  // Typing effect with perfect speed
  useEffect(() => {
    let timeoutId;
    
    const typeEffect = () => {
      if (charIndex < tagline.length) {
        setTaglineText(tagline.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        timeoutId = setTimeout(typeEffect, 4000); // Fast typing speed
      }
    };

    // Start immediately
    typeEffect();

    // Cleanup
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [charIndex, tagline]);

  // Handle back navigation
  const handleBack = () => {
    navigate('/');
  };

  // Handle book appointment
  const handleBookAppointment = (hospital) => {
    navigate('/bookings', { 
      state: { 
        selectedHospital: hospital.name,
        selectedCity: cityData.name,
      }
    });
  };

  return (
    <div className="hospitals-page">
      {/* ======== Tagline ======== */}
      <header className="tagline">
        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>
        <h1>{taglineText}</h1>
      </header>

      {/* ======== Hospitals List ======== */}
      <main className="hospitals-container">
        {cityData.hospitals.map((hospital) => (
          <div key={hospital.id} className="hospital-card">
            <img src={hospital.image} alt={hospital.name} />
            <div className="hospital-content">
              <h2>{hospital.name}</h2>
              <div className="specialties">
                {hospital.specialties.map((specialty, index) => (
                  <span key={index}>{specialty}</span>
                ))}
              </div>
              <button 
                className="book-btn" 
                onClick={() => handleBookAppointment(hospital)}
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* ======== Footer ======== */}
      <footer className="footer">
        <p>© 2025 MediQ | Stay Healthy, Stay Safe 💙</p>
      </footer>
    </div>
  );
};

export default Hospitals;