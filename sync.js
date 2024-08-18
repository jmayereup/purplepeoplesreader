const { exec } = require('child_process');
const path = require('path');

const sourceDirectory = path.resolve(__dirname, 'dist/ppr') + '/';
const destinationDirectory = 'ppr@purplepeoplesreader.com:/opt/pb-demo/';
const privateKeyPath = '/home/jmayer/.ssh/admin'; // Update this path to your private key

// Function to sync directories using rsync
function syncDirectories() {
  return new Promise((resolve, reject) => {
    const rsyncCommand = `rsync -avz --delete -e "ssh -i ${privateKeyPath}" ${sourceDirectory} ${destinationDirectory}`;

    console.log(`Executing command: ${rsyncCommand}`);
    exec(rsyncCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error during rsync: ${error.message}`);
        reject(error);
        return;
      }

      if (stderr) {
        console.error(`Rsync stderr: ${stderr}`);
        reject(new Error(stderr));
        return;
      }

      console.log(`Rsync stdout: ${stdout}`);
      resolve(stdout);
    });
  });
}

// Main function to sync directories
async function main() {
  try {
    console.log('Starting directory sync...');
    await syncDirectories();
    console.log('Directory sync complete.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
