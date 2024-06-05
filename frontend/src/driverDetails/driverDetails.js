import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './driverDetails.css';
import ImagesGallery from '../ImagesGallery/imagesGallery';

const DriverDetails = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/driver/${id}`);
        setDriver(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
        setLoading(false);
      }
    };

    fetchDriverDetails();
  }, [id]);

  if (!driver) {
    return <div>Ładowanie danych...</div>;
  }

  return (
    <>
    <div className=".container-driver-details ">
      {console.log(driver)}
      <div className='information'>
        <div className="driver-image">
          <img src={driver.photoForInformation} alt={`${driver.driverId}`} />
          <p>{driver.number} <img src={driver.photoFlag}></img></p>
          <h3>{driver.givenName} {driver.familyName}</h3>
        </div>
        <div className="driver-details">
          <img src={driver.photoHelmet} alt={`${driver.driverId}`} />
          <table>
    <tbody>
      <tr>
        <td>Zespół:</td>
        <td><span>{driver.constructor}</span></td>
      </tr>
      <tr>
        <td>Państwo:</td>
        <td><span>{driver.nationality}</span></td>
      </tr>
      <tr>
        <td>Podium:</td>
        <td><span>{driver.podiumCount}</span></td>
      </tr>
      <tr>
        <td>Punkty:</td>
        <td><span>{driver.countPoint}</span></td>
      </tr>
      <tr>
        <td>Występy:</td>
        <td><span>{driver.countRace}</span></td>
      </tr>
      <tr>
        <td>Mistrzostwa świata:</td>
        <td><span>{driver.worldChampionCount}</span></td>
      </tr>
      <tr>
        <td>Najwyższe miejsce:</td>
        <td><span>{driver.highestPosition} ({driver.highestPositionCount})</span></td>
      </tr>
      <tr>
        <td>Data urodzenia:</td>
        <td><span>{driver.dateOfBirth}</span></td>
      </tr>
    </tbody>
  </table>
        </div>
        <div className="biography">
        <h3>Biografia</h3>
        {driver.biography.map((akapit) => (
          <p>{akapit}</p>
        ))}
      </div>
      </div> 
      <ImagesGallery photos={driver.photos} />
    </div>
    </>
  );
};

export default DriverDetails;
