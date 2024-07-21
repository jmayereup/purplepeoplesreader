const PocketBase = require('pocketbase/cjs');
const fs = require('fs');
const path = require('path');

// Initialize PocketBase client
const pb = new PocketBase('https://purplepeoplesreader.com');

// Path for the JSON file
const FILENAME = path.join(__dirname, 'public/assets/all-records.json');

async function fetchAllRecords() {
  try {
    const languages = ['English', 'German', 'Thai'];
    const allRecords = [];

    for (const lang of languages) {
      const records = await pb.collection('lessons').getList(1, 500, {
        filter: `language="${lang}"`,
        sort: '-created', // Adjust sorting if needed
      });
      allRecords.push(...records.items);
    }

    // Create the JSON file content
    const jsonData = { items: allRecords };

    // Write the JSON data to a file
    fs.writeFileSync(FILENAME, JSON.stringify(jsonData));
    console.log('Data fetched and saved successfully.');
  } catch (error) {
    console.error('Error fetching lessons or writing file:', error);
  }
}

// Run the function to fetch all records and create the JSON file
fetchAllRecords();
