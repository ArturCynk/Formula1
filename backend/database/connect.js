const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const dbURI = "mongodb+srv://Artur:Cyn.41Ar@cluster0.ytygtvd.mongodb.net/Formula1?retryWrites=true&w=majority&appName=Cluster0";
        await mongoose.connect(dbURI);
        console.log('Połączono z bazą danych MongoDB');
    } catch(err){
        console.error('Błąd połączenia z bazą danych:',err);
    }
}

module.exports = connectDB;