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

// app.post('/', async (req, res) => {
//     const prompt = req.body.prompt;
//     const maxLength = req.body.max_length || 50;

//     try {
//         const response = await axios.post('http://localhost:5000/generate', {
//             prompt: prompt,
//             max_length: maxLength
//         });

//         res.json(response.data);
//     } catch (error) {
//         console.error('Error generating text:', error);
//         res.status(500).send('Error generating text');
//     }
// });

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
