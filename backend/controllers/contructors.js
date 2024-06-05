const axios = require('axios');
const { json } = require('express');
const xml2js = require('xml2js');
const { Constructor } = require('../model/Constructor');
const Driver = require('../model/Driver');
const fs = require('fs');

const date = new Date();
const year = date.getFullYear();


async function getconstructorStandingForYear(year) {
    const constructorStandingsForYearUrl = `https://ergast.com/api/f1/${year}/constructorStandings`;

    try{
        const response = await axios.get(constructorStandingsForYearUrl);
        const xmlData = response.data;


        return new Promise((resolve, reject) => {
            xml2js.parseString(xmlData, (err,result)=>{
                if(err){
                    reject('Błąd podczas konwercji danych XML na JSON:',err);
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


// klasyfikacji kierowców 
const constructorStandingsYear = async (req, res) => {
    try {
        let result = await getconstructorStandingForYear(year);
        result = JSON.parse(result);

        let constructorStandings = result.MRData.StandingsTable[0].StandingsList[0].ConstructorStanding;
        let constructorIds = constructorStandings.map(constructor => constructor.Constructor[0].$.constructorId);

        let constructorDocuments = await Constructor.find({ id: { $in: constructorIds } }).populate('driver');

        let constructorStandingsArray = [];

        for (let i = 0; i < constructorStandings.length; i++) {
            let position = constructorStandings[i].$.position;
            let points = constructorStandings[i].$.points;
            let constructorFromDatabase = constructorDocuments.find(doc => doc.id === constructorStandings[i].Constructor[0].$.constructorId);
                let driverOneId = constructorFromDatabase.driver[0];
                let driverTwoId = constructorFromDatabase.driver[1];

                // Fetch driver information from Driver collection
                let driverOne = await Driver.findOne({ driverId: driverOneId });
                let driverTwo = await Driver.findOne({ driverId: driverTwoId });

                constructorStandingsArray.push({
                    position: position,
                    points: points,
                    constructor: constructorFromDatabase,
                    driverOne: driverOne,
                    driverTwo: driverTwo
                });
        }
        res.json(constructorStandingsArray);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching constructor standings.' });
    }
}





// do nawigacji konstruktorów 
const constructorYear = async (req, res) => {
    try {
        const constructors = await Constructor.find({});

        constructors.sort((a, b) => {
            const idA = a.id.toLowerCase();
            const idB = b.id.toLowerCase();
            
            if (idA < idB) return -1;
            if (idA > idB) return 1;
            return 0;
        });

        res.json(constructors);
    } catch (error) {
        console.error('Błąd podczas pobierania danych konstruktora:', error);
        res.status(500).json({ message: 'Wystąpił błąd podczas pobierania danych konstruktora.' });
    }
};

async function getDataConstructor(id) {
    const constructorStandingsForYearUrl = `https://ergast.com/api/f1/constructors/${id}/constructorStandings?limit=100`;

    try{
        const response = await axios.get(constructorStandingsForYearUrl);
        const xmlData = response.data;


        return new Promise((resolve, reject) => {
            xml2js.parseString(xmlData, (err,result)=>{
                if(err){
                    reject('Błąd podczas konwercji danych XML na JSON:',err);
                }else{
                    let worldChampion = 0;
                    let win = 0;
                    let points = 0;

                    let data = result.MRData.StandingsTable;

                    data.forEach(element => {
                        element.StandingsList.forEach(standings => {
                            standings.ConstructorStanding.forEach(constructorStanding => {
                                if(constructorStanding[`$`].position == '1'){
                                    worldChampion++;
                                }
                                points += Number(constructorStanding[`$`].points);
                                win += Number(constructorStanding[`$`].wins)
                            });
                        });
                    });
                    

                    result = {
                        worldChampion : worldChampion,
                        win : win,
                        points : points
                    }
                    resolve(result);
                }
            })
        })
    }catch(error){
        throw new Error(`Błąd podczas pobierania wyników construktorów:`, error);
    }
}

async function getPolePosition(id) {
    const constructorStandingsForYearUrl = `https://ergast.com/api/f1/2023/7/qualifying/1`;

    try{
        const response = await axios.get(constructorStandingsForYearUrl);
        const xmlData = response.data;


        return new Promise((resolve, reject) => {
            xml2js.parseString(xmlData, (err,result)=>{
                if(err){
                    reject('Błąd podczas konwercji danych XML na JSON:',err);
                }else{
                    resolve(result);
                }
            })
        })
    }catch(error){
        throw new Error(`Błąd podczas pobierania wyników construktorów:`, error);
    }
}

function countPolePositions(data,id) {
    let count = 0;
    for (const entry of data) {
        const race = entry.MRData.RaceTable[0].Race[0];
        if (race.QualifyingList && race.QualifyingList.length > 0) {
          const qualifyingList = race.QualifyingList[0];
          const constructorId = qualifyingList.QualifyingResult[0].Constructor[0][`$`].constructorId;
          if (constructorId === id) {
              count++;
          }
      }
    }
    return count;
  }



function readAndCountPolePositions(id) {
    const fileName = 'qualifying_results.json';
    try {
        const data = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        const polePositionCount = countPolePositions(data,id);
        return polePositionCount;
    } catch (error) {
        console.error('Błąd podczas odczytu pliku:', error);
    }
}



const constructorInformation = async (req,res) => {
    let id = req.params.id;

    let constructor = await Constructor.findOne({ id: id });
    let driverOne = await Driver.findOne({ driverId: constructor.driver[0]});
    let driverTwo = await Driver.findOne({ driverId: constructor.driver[1]});

    let data = await getDataConstructor(id);
    let polePosition = readAndCountPolePositions(id)


    let constructorData = {
        ...constructor[`_doc`],
        ...data,
        polePosition : polePosition,
        driverOne : driverOne,
        driverTwo : driverTwo
    }

    res.json(constructorData);
}

const constructorInformationYearByYear = async (req, res) => {
    let id = req.params.id;

    let constructor = await Constructor.findOne({ id: id });

    let result = {
        ...constructor.biography,
        constructor: constructor.name
    }

    res.json(result);

}




module.exports = {constructorYear, constructorStandingsYear, constructorInformation,constructorInformationYearByYear}