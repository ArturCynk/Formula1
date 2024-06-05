const express = require('express');
const { constructorYear, constructorStandingsYear, constructorInformation, constructorInformationYearByYear } = require('../controllers/contructors');

const routesContructor = express.Router();

routesContructor.get('/api/contructors', constructorYear); // do nawigacji construktorów

routesContructor.get('/api/contructors-standings-year', constructorStandingsYear); // do construktorów klasyfikacja 

routesContructor.get('/api/contructor/:id', constructorInformation ); // informacje o constructor

routesContructor.get('/api/contructor/:id/year-by-year',constructorInformationYearByYear);

module.exports = routesContructor;