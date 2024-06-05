const axios = require('axios');
const { json } = require('express');
const xml2js = require('xml2js');

const date = new Date();
const year = date.getFullYear();

async function resultYearRace (year) {
    const constructorStandingsForYearUrl = `https://ergast.com/api/f1/${year}/constructorStandings`;

    try{
        const response = await axios.get(constructorStandingsForYearUrl);
        const xmlData = response.data;


        return new Promise((resolve, reject) => {
            xml2js.parseString(xmlData, (err,result)=>{
                if(err){
                    reject('Błąd podczas konwercji danych XML na JSON:',err);
                    //netflix and chill
                    //jak mówiłaś wczoraj
                    //haha
                }else{
                    let data = JSON.stringify(result);
                    resolve(data);
                }
            })
        })
    }catch(error){
        throw new Error(`Błąd podczas pobierania wyników construktorów:`, error);
    }
}
const resultsYear = async (req, res) => {
    
    res.json({year : year});
}

module.exports = {resultsYear};