// utils/csvProcessor.js
const fs = require('fs');
const csv = require('csv-parser');
const Participation = require('../models/participation');
const moment = require('moment'); // Import the moment.js library

// Function to generate UUID in the format "YYYYMMDDNNNN"
// Function to generate a unique UUID
function generateUUID() {
    const currentDate = moment().format('YYYYMMDD'); // Get current date in YYYYMMDD format
    const randomNumber = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
    const paddedNumber = randomNumber.toString().padStart(4, '0'); // Pad the random number with leading zeros
    return currentDate + paddedNumber;
}


async function processCSV(filePath) {
    return new Promise((resolve, reject) => {
        const participations = [];
        const generatedUUIDs = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                console.log('Row:', row); // Log the entire row to check its contents
                const uuid = generateUUID(); // Generate a unique identifier
                generatedUUIDs.push(uuid); // Collect generated UUIDs
                const participation = new Participation({
                    name: row.NAME, // Use the correct key names
                    email: row['Email Address'], // Use the correct key names
                    uuid: uuid
                });
                participations.push(participation);
            })
            .on('end', () => {
                // Save participations to MongoDB
                Participation.insertMany(participations)
                    .then(() => {
                        resolve({
                            message: 'CSV file uploaded and data saved to MongoDB successfully',
                            generatedUUIDs: generatedUUIDs // Include generated UUIDs in the response
                        });
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

module.exports = {
    processCSV
};
