
const PocketBase = require('pocketbase/cjs');
const fs = require('fs');
const path = require('path');

// Initialize PocketBase client
const pb = new PocketBase('https://purplepeoplesreader.com');

// Path for the routes file
const ROUTES_FILE_PATH = path.join(__dirname, 'routes.txt');


function generateRoutesFromEnums() {
  const routes = [];
  const languages = ['English', 'Thai', 'German', 'Spanish', 'French'];
  const tags = ['A1', 'A2', 'B1', 'STORY', 'CONVERSATION', 'GRAMMAR', 'NON-FICTION', 'VIDEO']


  languages.forEach(language => {
    tags.forEach(tag => {
      routes.push(`list/${language}/${tag}`);
    });
  });
  return routes;
}

async function fetchLessonIds() {
  try {

    // Fetch all records from the 'lessons' collection
    const records = await pb.collection('lessons').getFullList({
      sort: '-created', // Adjust sorting if needed
    });

    const ids = records.map(record => 'lesson/' + record.id);

    // Create the routes file content
    const routesFromEnums = generateRoutesFromEnums()

    const allRoutes = [...routesFromEnums, ...ids];
    const routesContent = allRoutes.join('\n');


    // Write the routes to a file
    fs.writeFileSync(ROUTES_FILE_PATH, routesContent);
    console.log('Routes file created successfully.');
  } catch (error) {
    console.error('Error fetching lessons or writing file:', error);
  }
}

// Run the function to fetch lesson IDs and create the routes file
fetchLessonIds();
