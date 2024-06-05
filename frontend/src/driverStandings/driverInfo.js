import React from 'react';
import { Link } from 'react-router-dom';

const DriverInfo = ({ driver, hovered, onMouseEnter, onMouseLeave }) => {
  return (
    <Link
    to={`/driver/${driver.driverId}`}
      className="driver-info"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ borderColor: hovered ? driver.color : 'black' }}
    >
      <div className="place-div">
        {console.log(driver)}
        <div className="place">{driver.position}</div>
        <div className="points">
          <div>{driver.points}</div>
          <div className="points-text">PTS</div>
        </div>
      </div>
      <div className="info">
        <div style={{ backgroundColor: driver.color }} className="color"></div>
        <div className="driverName">
          <p className="givenName">{driver.givenName}</p>
          <p className="familyName">{driver.familyName}</p>
        </div>
        <div className="flag">
          <img src={driver.photoFlag} alt={`${driver.driverId}`} />
        </div>
      </div>
      <div className="photo">
        <div className="constructor">
          <p>{driver.constructor}</p>
        </div>
        <div className="images">
          <img src={driver.photoNumber} className="photoNumber" alt={`${driver.driverId}`} />
          <img src={driver.photoForStatistics} className="photoForStatistics" alt={`${driver.driverId}`} />
        </div>
      </div>
    </Link>
  );
}

export default DriverInfo;
