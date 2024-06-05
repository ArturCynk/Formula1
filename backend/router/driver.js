const express = require('express');
const { driversYers, 
    // driverResult, 
    driverResultYear,
    driverInformation } = require('../controllers/driver');

const routesDriver = express.Router();

routesDriver.get('/api/drivers', driversYers); // nawigacja do nawigacji kierowcy

// Obsługa żądania POST dla danych kierowcy
// routes.post('/api/driver-results', driverResult);

routesDriver.get('/api/driver-results-year', driverResultYear) // strona dla all drivers
routesDriver.get('/api/driver/:id', driverInformation); // strona o kierowcy 




module.exports = routesDriver