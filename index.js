const express = require('express');
const axios = require('axios');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the "src" directory
app.use(express.static(__dirname + '/src'));

// Serve index.html at the root
const chatBotPath = __dirname + '/src/index.html';

app.get('/', (req, res) => {
    res.sendFile(chatBotPath);
});


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
