import React, { useState } from 'react';
import './App.css';
import Headers from './headers/headers';
import DriverStandings from './driverStandings/driverStandings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DriverDetails from './driverDetails/driverDetails';
import ConstructorStandings from './ConstructorStandings/ConstructorStandings';
import ConstructorDetails from './ConstructorDetails/ConstructorDetails';
import ConstructorYearByYear from './ConstructorDetails/ConstructorYearByYear/ConstructorYearByYear';

function App() {
  const [showDriverStandings, setShowDriverStandings] = useState(false);

  return (
    <div>
      <Router>
      <Headers setShowDriverStandings={setShowDriverStandings} />
        <Routes>
          <Route path="/driver/:id" element={<DriverDetails />} />
          <Route path="/driver" element={<DriverStandings />} />
          <Route path="/constructor" element={<ConstructorStandings />} />
          <Route path="/constructor/:id" element={<ConstructorDetails />} />
          <Route path="/constructor/:id/year-by-year" element={<ConstructorYearByYear />} />

        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
