const express = require('express');
const { resultsYear } = require('../controllers/results');
const routesResults = express.Router();

routesResults.get('/api/result-year',resultsYear);


module.exports = routesResults