const axios = require('axios');
const { json } = require('express');
const xml2js = require('xml2js');
const Driver = require('../model/Driver');

const date = new Date();
const year = date.getFullYear();

// Pobierz dane z Ergast API, przekonwertuj na JSON i wybierz interesujące informacje
async function getDriversData() {
  const apiUrl = `http://ergast.com/api/f1/${year}/drivers`;

  try {
    const response = await axios.get(apiUrl);
    const xmlData = response.data;
    const colors = ['#64C4FF',"#229971",'#3671C6',"#52E252",'#0093CC','#27F4D2','#B6BABD','#E80020','#B6BABD','#FF8000','#0093CC','#3671C6','#FF8000','#6692FF','#27F4D2','#E80020','#64C4FF','#229971','#6692FF','#3671C6',]
    
    return new Promise((resolve, reject) => {
      xml2js.parseString(xmlData, (err, result) => {
        if (err) {
          reject('Błąd podczas przetwarzania danych XML:', err);
        } else {
          const driversData = result.MRData.DriverTable[0].Driver.map((driver, index) => ({
            driverId: driver.$.driverId,
            givenName: driver.GivenName[0],
            familyName: driver.FamilyName[0],
            nationality: driver.Nationality[0],
            color: colors[index % colors.length] 
          }));
          resolve(driversData);
        }
      });
    });
  } catch (error) {
    throw new Error('Błąd podczas pobierania danych:', error);
  }
}



const driversYers = async (req, res) => {
    try {
      const drivers = await getDriversData();
      const updatedDrivers = drivers.filter(driver => driver.driverId !== "bearman");
      res.json(updatedDrivers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych kierowców.' });
    }
}

// async function getDriverResults(driverId) {
//     const driverResultsUrl = `https://ergast.com/api/f1/drivers/${driverId}/results/?limit=400`;
    
//     try {
//       const response = await axios.get(driverResultsUrl);
//       const xmlData = response.data; // Pobierz dane z odpowiedzi
      
//       return new Promise((resolve, reject) => {
//         xml2js.parseString(xmlData, (err, result) => {
//           if (err) {
//             reject('Błąd podczas konwersji danych XML na JSON:', err);
//           } else {
//             const jsonData = JSON.stringify(result); // Konwertuj na JSON
//             resolve(jsonData); // Zwróć dane JSON
//           }
//         });
//       });
//     } catch (error) {
//       throw new Error('Błąd podczas pobierania wyników kierowcy:', error);
//     }
//   }
  

// const driverResult = async (req, res) => {
//     const { driverId } = req.body;
  
//     try {
//       let results = await getDriverResults(driverId);

//       results = JSON.parse(results);

//       let dataToFrontend = [];
//       for (let i = 0; i < results.MRData.RaceTable[0].Race.length; i++) {
//         dataToFrontend.push(results.MRData.RaceTable[0].Race[i].ResultsList[0].Result[0][`$`]);
//       }
//       dataToFrontend.reverse();
      
//       res.json(dataToFrontend);
//     } catch (error) {
//       console.error(error);
//       res.status(200).json({ error: 'Wystąpił błąd podczas pobierania wyników kierowcy.' });
//     }
//   }

async function getLastRaceId(year){
  const getDriverResultUrl = `https://ergast.com/api/f1/${year}`;

  try{
    const response = await axios.get(getDriverResultUrl);
    const xmlData = response.data;

    return new Promise((resolve, reject) => {
      xml2js.parseString(xmlData, (err, result) => {
        if (err) {
          reject('Błąd podczas konwersji danych XML na JSON:', err);
        } else {
          let jsonData = JSON.stringify(result); 
          jsonData = JSON.parse(jsonData);

          let day = date.getDate();
          let month = date.getMonth() + 1;
          let yeara = date.getFullYear();
      
          
          let currentDate = `${yeara}-${month}-${day}`;
          const currentDateDate = new Date(currentDate);
          let race = {};
          for (let i = 0; i < jsonData.MRData.RaceTable[0].Race.length; i++) {
            let a = new Date(jsonData.MRData.RaceTable[0].Race[i].Date[0]);
            if(a.getTime() < currentDateDate.getTime()){
              race = jsonData.MRData.RaceTable[0].Race[i];
              
            }
          }
          race = JSON.stringify(race[`$`]);
          resolve(race);
        }
      });
    });
  } catch (error) {
    throw new Error('Błąd podczas pobierania wyników kierowcy:', error);
  }
}

async function driverStandingsForYear(year){
  const driverStandingsForYearUrl = `https://ergast.com/api/f1/${year}/driverStandings`;
  
  try{
    const response = await axios.get(driverStandingsForYearUrl);
    const xmlData = response.data;

    return new Promise((resolve, reject) => {
      xml2js.parseString(xmlData, (err, result) => {
        if (err) {
          reject('Błąd podczas konwersji danych XML na JSON:', err);
        } else {
            let data = JSON.stringify(result);
            resolve(data)
          }
      })}
    )
  }catch (error) {
      throw new Error('Błąd podczas pobierania wyników kierowcy:', error);
    }
}

const driverResultYear = async (req,res) => {
  try{
    // let lastRaceId = await getLastRaceId(year);
    // lastRaceId = JSON.parse(lastRaceId).round;
    // console.log(lastRaceId);
    let results = await driverStandingsForYear(year);

    results = JSON.parse(results);

    let driverStandingsArray = [];

    for (let i = 0; i < results.MRData.StandingsTable[0].StandingsList[0].DriverStanding.length; i++) {
      let position = results.MRData.StandingsTable[0].StandingsList[0].DriverStanding[i][`$`].position;
      let points = results.MRData.StandingsTable[0].StandingsList[0].DriverStanding[i][`$`].points;
      let constructor = results.MRData.StandingsTable[0].StandingsList[0].DriverStanding[i].Constructor[0].Name[0];

      let object = {
        driverId: results.MRData.StandingsTable[0].StandingsList[0].DriverStanding[i].Driver[0][`$`].driverId,
        givenName: results.MRData.StandingsTable[0].StandingsList[0].DriverStanding[i].Driver[0].GivenName[0],
        familyName: results.MRData.StandingsTable[0].StandingsList[0].DriverStanding[i].Driver[0].FamilyName[0],
        nationality: results.MRData.StandingsTable[0].StandingsList[0].DriverStanding[i].Driver[0].Nationality[0], 
        position: position,
        points: points,
        constructor: constructor,
      };

      let driverForDataBase = await Driver.findOne({driverId : object.driverId });

      object = {
        ...object,
        ...driverForDataBase[`_doc`]
      }

      driverStandingsArray.push(object);

    }
    res.json(driverStandingsArray);
  }catch (error){
    console.error(error);
    res.status(200).json({ error: 'Wystąpił błąd podczas pobierania wyników kierowcy.' });
  }
}

async function getDriverInformation (id) {
  const driverStandingsForYearUrl = `https://ergast.com/api/f1/drivers/${id}/results/?limit=400`;
  try{
    const response = await axios.get(driverStandingsForYearUrl);
    const xmlData = response.data;

    return new Promise((resolve, reject) => {
      xml2js.parseString(xmlData, (err, result) => {
        if (err) {
          reject('Błąd podczas konwersji danych XML na JSON:', err);
        } else {
            let data = JSON.stringify(result);
            resolve(data)
          }
      })}
    )
  }catch (error) {
      throw new Error('Błąd podczas pobierania wyników kierowcy:', error);
    }
}


async function getWorldChampionsCouts (id) {
  const driverStandingsForYearUrl = `https://ergast.com/api/f1/drivers/${id}/driverStandings/1/seasons`;
  try{
    const response = await axios.get(driverStandingsForYearUrl);
    const xmlData = response.data;

    return new Promise((resolve, reject) => {
      xml2js.parseString(xmlData, (err, result) => {
        if (err) {
          reject('Błąd podczas konwersji danych XML na JSON:', err);
        } else {
            let data = JSON.stringify(result);
            resolve(data)
          }
      })}
    )
  }catch (error) {
      throw new Error('Błąd podczas pobierania wyników kierowcy:', error);
    }
}

const driverInformation = async (req,res) => {
  let id = req.params.id;
  let results = await getDriverInformation(id);

  results = JSON.parse(results);

  let driverForDataBase = await Driver.findOne({driverId : id });

  let pointCount = 0;
  let sum = 0;
  let podiumCount = 0;
  let highestPosition = Infinity;
  let highestPositionCount = 0;
  
  for (let i = 0; i < results.MRData.RaceTable[0].Race.length; i++) {
    pointCount += Number(results.MRData.RaceTable[0].Race[i].ResultsList[0].Result[0]['$'].points);
    let position = Number(results.MRData.RaceTable[0].Race[i].ResultsList[0].Result[0]['$'].position);
    
    if (position === 1 || position === 2 || position === 3) {
      podiumCount++;
    }
    
    sum++;
  
    if (position < highestPosition) {
      highestPosition = position;
      highestPositionCount = 1; // Zresetuj licznik, jeśli znaleziono nowe najwyższe miejsce
    } else if (position === highestPosition) {
      highestPositionCount++; // Inkrementuj licznik, jeśli napotkano kolejne wystąpienie najwyższego miejsca
    }
  }
  let constructor = results.MRData.RaceTable[0].Race[sum-1].ResultsList[0].Result[0].Constructor[0].Name[0];
  let number = results.MRData.RaceTable[0].Race[sum-1].ResultsList[0].Result[0][`$`].number;
  let givenName = results.MRData.RaceTable[0].Race[sum-1].ResultsList[0].Result[0].Driver[0].GivenName[0];
  let familyName = results.MRData.RaceTable[0].Race[sum-1].ResultsList[0].Result[0].Driver[0].FamilyName[0];
  let dateOfBrith = results.MRData.RaceTable[0].Race[sum-1].ResultsList[0].Result[0].Driver[0].DateOfBirth[0];
  let nationality = results.MRData.RaceTable[0].Race[sum-1].ResultsList[0].Result[0].Driver[0].Nationality[0];

  let WorldChampionCount = await getWorldChampionsCouts(id);
  WorldChampionCount = JSON.parse(WorldChampionCount);
  WorldChampionCount = WorldChampionCount.MRData[`$`].total;
  
  results = {
    givenName: givenName,
    familyName: familyName,
    dateOfBirth: dateOfBrith,
    nationality: nationality,
    number : number,
    constructor : constructor,
    countPoint : pointCount,
    countRace : sum,
    podiumCount : podiumCount,
    highestPosition : highestPosition,
    highestPositionCount : highestPositionCount,
    worldChampionCount : WorldChampionCount,
    ...driverForDataBase[`_doc`]
  }
  res.json(results);
};


module.exports = {driversYers,
  // driverResult,
  driverResultYear,
  driverInformation}