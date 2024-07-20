const PocketBase = require('pocketbase/cjs');
const fs = require('fs');
const path = require('path');

// Initialize PocketBase client
const pb = new PocketBase('https://purplepeoplesreader.com');

// Path for the JSON file
const FILENAME = path.join(__dirname, 'public/assets/all-records.json');

async function fetchAllRecords() {
  try {
    // Fetch all records from the 'lessons' collection
    const records = await pb.collection('lessons').getFullList({
      sort: '-created', // Adjust sorting if needed
    });

    // Create the JSON file content
    const jsonData = { items: records };

    // Write the JSON data to a file
    fs.writeFileSync(FILENAME, JSON.stringify(jsonData, null, 2));
    console.log('Data fetched and saved successfully.');
  } catch (error) {
    console.error('Error fetching lessons or writing file:', error);
  }
}

// Run the function to fetch all records and create the JSON file
fetchAllRecords();
