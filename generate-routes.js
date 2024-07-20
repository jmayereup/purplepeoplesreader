const PocketBase = require('pocketbase/cjs');
const fs = require('fs');
const path = require('path');

// Initialize PocketBase client
const pb = new PocketBase('https://purplepeoplesreader.com');

// Path for the routes file
const ROUTES_FILE_PATH = path.join(__dirname, 'routes.txt');

async function fetchLessonIds() {
  try {
    // Fetch all records from the 'lessons' collection
    const records = await pb.collection('lessons').getFullList({
      sort: '-created', // Adjust sorting if needed
    });

    // Extract the IDs from the records
    const ids = records.map(record => record.id);

    // Create the routes file content
    const routesContent = ids.join('\n');

    // Write the routes to a file
    fs.writeFileSync(ROUTES_FILE_PATH, routesContent);
    console.log('Routes file created successfully.');
  } catch (error) {
    console.error('Error fetching lessons or writing file:', error);
  }
}

// Run the function to fetch lesson IDs and create the routes file
fetchLessonIds();
