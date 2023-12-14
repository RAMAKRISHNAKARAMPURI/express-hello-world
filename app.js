const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/slack/command', async (req, res) => {
  console.log('testing');
  const { command, text, response_url, user_id, channel_id } = req.body;

  // Make a request to your server to get the details
  const details = await fetchDetailsFromServer();

  // Construct the message
  const message = `Details from the server: ${details}`;

  // Respond to the Slack command
  await sendResponseToSlack(response_url, message);

  res.status(200).end();
});

async function fetchDetailsFromServer() {
  // Implement logic to fetch details from your server
  // ...

  // For demonstration purposes, let's assume a simple response
  return 'Server details go here';
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


// npm init -y
// npm install express body-parser axios
// node app.js
