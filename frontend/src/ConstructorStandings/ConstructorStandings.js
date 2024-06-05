import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ConstructorStandings.css';
import { Link } from 'react-router-dom';

const ConstructorStandings = () => {
  const [standings, setStandings] = useState([]);
  const [hoveredDriver, setHoveredDriver] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contructors-standings-year');
        setStandings(response.data);
      } catch (error) {
        console.error('Error fetching constructor standings:', error);
      }
    };

    fetchStandings();
  }, []);

  const handleMouseEnter = (constructor) => {
    setHoveredDriver(constructor);
  };

  const handleMouseLeave = () => {
    setHoveredDriver(null);
  };


  return (
    <div className="constructor-standings-container">
        <div className="title">
        <h1>Zespoły F1 2024</h1>
      </div>
      <div className='information'>
        <p>Odkryj wszystko, co musisz wiedzieć o tegorocznych zespołach Formuły 1 – kierowcy, miejsca na podium, zdobyte punkty i tytuły mistrzowskie.</p>
      </div>
      {standings.map((team, index) => (
        <Link to={`/constructor/${team.constructor.id}`}  key={index}
        onMouseEnter={() => handleMouseEnter(team.constructor)}
        onMouseLeave={handleMouseLeave}
        className="constructor-standings-item"
        style={{ borderColor: hoveredDriver === team.constructor ? team.constructor.color : 'black' }}>
          <div className="place-div">
        <div className="place">{team.position}</div>
        <div className="points">
          <div>{team.points}</div>
          <div className="points-text">PTS</div>
        </div>
      </div>
          <div className="constructor-info">
            <div className="team-color" style={{ backgroundColor: team.constructor.color }}></div>
            <div className="team-name">{team.constructor.name}</div>
          </div>
          <div className="drivers">
            <div className="driver">
              <div>{team.driverOne.fistName} <span>{team.driverOne.lastName}</span></div>
              <img src={team.driverOne.photoForStatistics} alt={team.constructor.driver[0]} />
            </div>
            <div className="driver">
              <div>{team.driverTwo.fistName} <span>{team.driverTwo.lastName}</span></div>
              <img src={team.driverTwo.photoForStatistics} alt={team.constructor.driver[1]} / >
            </div>
          </div>
          <div className="car-photo">
            <img src={team.constructor.photoBolide} alt={team.constructor.name} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ConstructorStandings;
