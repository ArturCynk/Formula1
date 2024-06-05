const { Constructor } = require('../model/Constructor');
const constructorData = require('./Constructor.json');

const addConstructorToDatabase = async () => {
    try{
        const existingConstructor = await Constructor.findOne({});

        if(!existingConstructor){
            await Constructor.insertMany(constructorData);
            console.log('Dane constructorów zostały dodane do bazy danych.');
        }else{
            console.log('Dane constructorów już istnieją, pominięto dodawanie.');
        }
    } catch (error) {
        console.error('Błąd podczas dodawania danych constructorów:', error);
    }
}

module.exports = addConstructorToDatabase;

