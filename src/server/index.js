let iUrl = []

var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
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

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// API
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY



// POST Route
app.post('/add-url', async function(req, res) {
    iUrl = req.body.url;
    const URL = `${baseURL}key=${apiKey}&url=${iUrl}&lang=en`
    const secondResponse = await fetch(URL)
    const newData = await secondResponse.json()
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