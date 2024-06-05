import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from './progressBar';
import DriverInfo from './driverInfo';
import DriverGridItem from './driverGridItem';
import './driverStandings.css';

const DriverStandings = () => {
  const [drivers, setDrivers] = useState([]);
  const [hoveredDriver, setHoveredDriver] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/driver-results-year');
        setDrivers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ProgressBar />
      <div className="title">
        <h1>F1 Kierowcy 2024</h1>
      </div>
      <div className='information'>
        <p>Sprawdź oficjalny skład F1 na ten sezon. Pełny podział kierowców, punktów i aktualnych pozycji. Śledź swoich ulubionych kierowców F1 na torze i poza nim.</p>
      </div>
      <div className='podium'>
        {drivers.slice(0, 3).map((driver, index) => (
          <DriverInfo
            key={index}
            driver={driver}
            hovered={hoveredDriver === driver}
            onMouseEnter={() => setHoveredDriver(driver)}
            onMouseLeave={() => setHoveredDriver(null)}
          />
        ))}
      </div>
      <div className="grid">
        {drivers.slice(3).map((driver, index) => (
          <DriverGridItem
            key={index + 4}
            driver={driver}
            hovered={hoveredDriver === driver}
            onMouseEnter={() => setHoveredDriver(driver)}
            onMouseLeave={() => setHoveredDriver(null)}
          />
        ))}
      </div>
    </>
  );
}

export default DriverStandings;
