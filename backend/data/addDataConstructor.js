const Driver = require('../model/Driver')
const driverData = require('./Driver.json');

const addDriverToDatabase = async () => {
    try{
        const existingDrivers = await Driver.findOne({});

        if(!existingDrivers){
            await Driver.insertMany(driverData);
            console.log('Dane kierowców zostały dodane do bazy danych.');
        }else{
            console.log('Dane kierowców już istnieją, pominięto dodawanie.');
        }
    } catch (error) {
        console.error('Błąd podczas dodawania danych kierowców:', error);
    }
}

module.exports = addDriverToDatabase

