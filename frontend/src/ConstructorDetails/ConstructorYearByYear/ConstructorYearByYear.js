import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ConstructorYearByYear.css';

const ConstructorYearByYear = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/contructor/${id}/year-by-year`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="constructor-year-by-year">
      <h1>{id} Year by Year History</h1>
      {Object.entries(data).map(([key, item]) => (
        <div key={key} className="constructor-year-by-year-detail">
          <h2>{item.year}</h2>
          <img src={item.photo} alt={`${item.year} photo`} className="year-by-year-image" />
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ConstructorYearByYear;
