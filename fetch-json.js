const fs = require('fs');
const path = require('path');
const POCKETBASE_API_URL = 'https://purplepeoplesreader.com/api/collections/lessons/records';

fetch(POCKETBASE_API_URL)
    .then(response => response.json())
    .then(data => {
        const filename = path.join(__dirname, '/src/assets/all-records.json');
        fs.writeFileSync(filename, JSON.stringify(data, null, 2));
        console.log('Data fetched and saved successfully.');
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
