import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './kierowcy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Kierowcy = ({ showDrivers, setShowDrivers,setShowDriverStandings }) => {
  const [drivers, setDrivers] = useState([]);
  const [hoveredDriver, setHoveredDriver] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/drivers');
        setDrivers(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchData();
  }, []);

  const handleMouseLeave = () => {
    setShowDrivers(false); 
  };

  return (
    <>
      {showDrivers && (
        <div className="container dropdown" onMouseLeave={handleMouseLeave}>
          <div className="header">
            <Link Link to={`/driver`} className="headerItem" onClick={() =>setShowDriverStandings(true) } >All drivers <FontAwesomeIcon icon={faAngleRight} /></Link>
            <Link className="headerItem">Hall of Fame <FontAwesomeIcon icon={faAngleRight} /></Link>
          </div>
          <div className="driversList">
            {drivers.map((driver, index) => (
              <Link to={`/driver/${driver.driverId}`}
                className="driverItem"
                key={index}
                onMouseEnter={() => setHoveredDriver(driver)}
                onMouseLeave={() => setHoveredDriver(null)}
                style={{ borderColor: hoveredDriver === driver ? driver.color : 'white' }}
              >
                <div className="colorBox" style={{ backgroundColor: driver.color }}></div>
                <div className="driverInfo">
                  <span>{driver.givenName} <span>{driver.familyName}</span></span>
                </div>
                <FontAwesomeIcon icon={faAngleRight} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Kierowcy;
