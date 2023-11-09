// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
const IP = require('ip');
const acceptLanguageParser = require('accept-language-parser');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', (req, res) => {
  const ipAddress = IP.address();

  const acceptLanguage = req.headers['accept-language'];
  const languages = acceptLanguageParser.parse(acceptLanguage);
  const preferredLanguage = languages[0].code;

  const software = req.get('User-Agent');

  res.json({
    "ipaddress": ipAddress,
    "language": preferredLanguage,
    "software": software
  });
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});