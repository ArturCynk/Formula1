const mongoose = require('mongoose');

const constructorSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name : { type: String, required: true, unique: true},
    color: { type: String, required: true },
    photoBolide: { type: String,required: true }, 
    photoLogo: { type: String},
    photoLogoStatistics : { type: String},
    driver : {type: Array, required: true},
    fullTeamName : { type: String },
    base : { type: String },
    teamChlef : { type: String},
    technicalChlef : { type: String},
    chassls : { type: String},
    powerUnit : { type: String},
    firstTeamEntry : { type: String},
    photos : {type: Array},
    description : { type: String},
    biography : {type: Array},
});

const Constructor = mongoose.model('Constructor', constructorSchema);

module.exports = { Constructor };