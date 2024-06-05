const mongoose = require('mongoose');

const CircuritSchema = new mongoose.Schema({
    nameCountry : {type :'string', required: true},
    photoName : {type :'string', required: true},
    nameRace : {type :'string', required: true},
    photoFlag : {type :'string', required: true},
    nameCircurit : {type :'string', required: true},
    photoCircurit : {type :'string', required: true},
    firstGrandPrix : {type :'string', required: true},
    numberOfLaps : {type :'string', required: true},
    circuritLength : {type :'string', required: true},
    raceDistance : {type :'string', required: true},
    labRecord : {type: object, required: true},
    description : {type: array, required: true},
    photoStatistic : {type: 'string', required: true},
    photoCircuritStatistic : {type: 'string', required: true},
    circuritDescription : {type: 'array', required: true},
    photoOfHeaderNav : {type: 'string', required: true},
})

const Circurit = mongoose.model('Circurit', CircuritSchema);

module.exports = Circurit;