import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './zespol.css';
import { Link } from 'react-router-dom';

const Zespol = ({ handleTeamsHover }) => {
    const [constructors, setConstructors] = useState([]);
    const [hoveredTeam, setHoveredTeam] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/contructors');
                setConstructors(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container-construcor" onMouseEnter={() => handleTeamsHover(true)} onMouseLeave={() => handleTeamsHover(false)}>
            <Link to={`/constructor`} className="all-teams">All Teams</Link>
            <div className="team-list">
                {constructors.map((team, index) => (
                    <Link to={`/constructor/${team.id}`}
                        key={index} 
                        className="team"
                        onMouseEnter={() => setHoveredTeam(team)}
                        onMouseLeave={() => setHoveredTeam(null)}
                        style={{ borderColor: hoveredTeam === team ? team.color : 'white' }}
                    >
                        <div className="team-header">
                            <span>{team.name}</span>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                        <img src={team.photoBolide} alt={`${team.constructor} car`} className="car-image" />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Zespol;
