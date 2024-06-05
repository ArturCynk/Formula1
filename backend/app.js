const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./database/connect');
const addDriverToDatabase = require('./data/addDataConstructor');
const addConstructorToDatabase = require('./data/addDataDriver');
const routesDriver = require('./router/driver');
const routesContructor = require('./router/contructors');
const { getAllQualifyingResults, readAndCountPolePositions } = require('./data/allPolePosition');
const routesResult = require('./router/results');

const PORT = 5000;



const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();
addDriverToDatabase();
addConstructorToDatabase();

app.use(routesDriver);
app.use(routesContructor);
app.use(routesResult)

app.listen(PORT, () => {
  console.log(`Serwer nasłuchuje na porcie ${PORT}`);
});
