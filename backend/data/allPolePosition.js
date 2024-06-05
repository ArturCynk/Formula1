const fs = require('fs');
const axios = require('axios');
const { json } = require('express');
const xml2js = require('xml2js');

async function getAllQualifyingResults() {
    const currentYear = new Date().getFullYear();
    const yearsToFetch = 22;
    const results = [];

    for (let i = currentYear; i > currentYear - yearsToFetch; i--) {
        for (let round = 1; round <= 21; round++) {
            try {
                const response = await axios.get(`http://ergast.com/api/f1/${i}/${round}/qualifying/1`);
                const xmlData = response.data;
    
                const result = await new Promise((resolve, reject) => {
                    xml2js.parseString(xmlData, (err, result) => {
                        if (err) {
                            reject('Błąd podczas konwercji danych XML na JSON:', err);
                        } else {
                            resolve(result);
                        }
                    });
                });

                if (result.MRData.RaceTable[0].Race) {
                    const race = result.MRData.RaceTable[0].Race[0];
                    if (race.QualifyingList[0].QualifyingResult[0].Constructor[0] && race.QualifyingList.length > 0) {
                        const qualifyingList = race.QualifyingList[0];
                        results.push(result);
                    } else {
                        console.log('Brak danych kwalifikacji dla tego wyścigu.');
                    }
                } else {
                }
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        }
    }

    // Zapis do pliku tylko jeśli istnieją dane do zapisania
    if (results.length > 0) {
        const fileName = 'qualifying_results.json';
        const dataToWrite = JSON.stringify(results, null, 2); // Formatowanie z wcięciami
        fs.writeFileSync(fileName, dataToWrite);
    } 
}
getAllQualifyingResults();