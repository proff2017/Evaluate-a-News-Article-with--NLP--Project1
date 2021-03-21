const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js')

// Start up an instance of app
const app = express()

// Cors allows the browser and server to communicate without any security interruptions
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname)

// API
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
console.log(`Your API Key is ${process.env.API_KEY}`);
let iUrl = []

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// POST Route
app.post('/api', async function(req, res) {
    iUrl = req.body.url;
    const finalURL = `${baseURL}key=${apiKey}&url=${iUrl}&lang=en`

    const response = await fetch(finalURL)
    const newData = await response.json()
    console.log(newData)
    res.send(newData)
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})