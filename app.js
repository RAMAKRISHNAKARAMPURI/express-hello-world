const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/slack/command', async (req, res) => {
  console.log('testing');
  const { response_url } = req.body;

  // Make a request to your server to get the details
  const details = await fetchDetailsFromServer();

  // Construct the message
  const message = `Details from the server:\n${details}`;

  // Respond to the Slack command
  await sendResponseToSlack(response_url, message);

  res.status(200).end();
});

async function fetchDetailsFromServer() {
  return new Promise((resolve, reject) => {
    // Execute the 'ps' command
    exec('ps', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing ps command: ${error.message}`);
        return reject('Failed to fetch server details');
      }
      if (stderr) {
        console.error(`ps command error: ${stderr}`);
        return reject('Failed to fetch server details');
      }

      // Resolve with the output of the 'ps' command
      resolve(stdout);
    });
  });
}

async function sendResponseToSlack(responseUrl, message) {
  // Send the constructed message back to Slack
  await axios.post(responseUrl, {
    text: message,
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
