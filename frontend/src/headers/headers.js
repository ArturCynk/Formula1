import React, { useState } from 'react';
import './header.css';
import Kierowcy from './nav/kierowcy/kierowcy';
import Zespol from './nav/zespol/zespol';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Headers = ({ setShowDriverStandings }) => {
  const [showDrivers, setShowDrivers] = useState(false);
  const [showTeams, setShowTeams] = useState(false);

  const handleMouseEnter = () => {
    setShowDrivers(true);
  };

  const handleDriversClick = () => {
    setShowDrivers(false);
  };

  const handleTeamsMouseEnter = () => {
    setShowTeams(true);
  };

  const handleTeamsMouseLeave = () => {
    setShowTeams(false);
  };

  const handleTeamsClick = () => {
    setShowTeams(!showTeams);
  };

  const handleTeamsHover = (hovered) => {
    setShowTeams(hovered);
  };

  return (
    <>
      <div className="container-header">
        <Link to="/">
          <img className="logo" src='https://www.formula1.com/etc/designs/fom-website/images/f1_logo.svg' alt="F1 Logo" />
        </Link>
        <ul>
          <li>Harmonogram <FontAwesomeIcon icon={faAngleDown} /></li>
          <li>Wyniki <FontAwesomeIcon icon={faAngleDown} /></li>
          <Link to={`/driver`} onMouseEnter={handleMouseEnter} onClick={() => setShowDriverStandings(true)} onMouseLeave={handleTeamsMouseLeave}>Kierowcy <FontAwesomeIcon icon={faAngleDown} /></Link>
          <Link to={`/constructor`} onMouseEnter={handleTeamsMouseEnter}  onClick={handleTeamsClick}>Zespół <FontAwesomeIcon icon={faAngleDown} /></Link>
        </ul>
      </div>
      <Kierowcy showDrivers={showDrivers} setShowDrivers={setShowDrivers} setShowDriverStandings={setShowDriverStandings} />
      {showTeams && <Zespol handleTeamsHover={handleTeamsHover} /> }
      </>
  );
}

export default Headers;
