import React from 'react';

const ProgressBar = () => {
  const progressBars = Array.from({ length: 100 }, (_, index) => (
    <div key={index} className="progress-bar"></div>
  ));

  return <div className="progress-bars-container">{progressBars}</div>;
}

export default ProgressBar;
