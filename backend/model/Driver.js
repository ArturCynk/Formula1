const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    driverId : {type: String, require: true, unique: true},
    color: {type: String, require: true},
    fistName : {type: String, require: true},
    lastName : {type: String, require: true},
    photoFlag : {type: String, require: true},
    photoForStatistics : {type: String, require: true},
    photoForInformation : {type: String, require: true},
    photoNumber : {type: String, require: true},
    photoHelmet : {type: String, require: true},
    biography : {type: Array, require: true},
    photos : {type: Array, require: true},
})

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;