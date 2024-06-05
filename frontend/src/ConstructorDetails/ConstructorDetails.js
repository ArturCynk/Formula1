import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ConstructorDetails.css';
import { Link, useParams } from 'react-router-dom';
import ImagesGallery from '../ImagesGallery/imagesGallery';

const ConstructorDetails = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:5000/api/contructor/${id}`);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching constructor data:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { name, fullTeamName, base, teamChief, technicalChief, chassis, powerUnit, firstTeamEntry, worldChampion, win, points, polePosition, drivers, photos, profile, biography } = data;

  return (
    <div className="container-constructor-detail">
      <div className="left-panel">
        <h1 className='name'>{data.name}</h1>
        <div className="logo">
          <img src={data.photoLogo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
        </div>
        <table>
          <tbody>
            <tr>
              <td>Full Team Name:</td>
              <td>{fullTeamName}</td>
            </tr>
            <tr>
              <td>Base:</td>
              <td>{base}</td>
            </tr>
            <tr>
              <td>Team Chief:</td>
              <td>{data.teamChlef}</td>
            </tr>
            <tr>
              <td>Technical Chief:</td>
              <td>{data.technicalChlef}</td>
            </tr>
            <tr>
              <td>Chassis:</td>
              <td>{data.chassls}</td>
            </tr>
            <tr>
              <td>Power Unit:</td>
              <td>{powerUnit}</td>
            </tr>
            <tr>
              <td>First Team Entry:</td>
              <td>{firstTeamEntry}</td>
            </tr>
            <tr>
              <td>World Champion:</td>
              <td>{worldChampion}</td>
            </tr>
            <tr>
              <td>Win:</td>
              <td>{win}</td>
            </tr>
            <tr>
              <td>Points:</td>
              <td>{points}</td>
            </tr>
            <tr>
              <td>Pole Position:</td>
              <td>{polePosition}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="right-panel">
        <div className="drivers">
            <Link to={`/driver/${data.driverOne.driverId}`} className="driver">
              <img src={data.driverOne.photoForInformation}  />
            </Link>
            <Link to={`/driver/${data.driverTwo.driverId}`} className="driver">
            <img src={data.driverTwo.photoForInformation} />
          </Link>
        </div>
      </div>
      <div className="photo-gallery">
        <ImagesGallery photos={data.photos} />
      </div>
      <div className="profile">
        <h1>{name}</h1>
        <p>{data.description}</p>
      </div>
      <div className="biography">
        {data.biography.slice(0, 5).map((item, index) => (
          <div key={index}>
            <h1>{item.year}</h1>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <Link to={`/constructor/${data.id}/year-by-year`}>
        <p>Przeczytaj pełny profil rok po roku</p>
      </Link>
    </div>
  );
};

export default ConstructorDetails;