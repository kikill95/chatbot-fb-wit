'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const wit = require('./wit');

app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', (req, res) => {
  res.send('There is a root of chat bot');
});

// for Facebook verification
app.get('/webhook/', (req, res) => {
  if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Auth error');
});

// Spin up the server
app.listen(app.get('port'), () => {
  console.log('running on port', app.get('port'));
});

// handler receiving messages
app.post('/webhook', (req, res) => {
  let events = req.body.entry[0].messaging;
  for (let i = 0; i < events.length; i++) {
    let event = events[i];
    if (event.message && event.message.text) {
      wit.runActions(event.sender.id, event.message.text || 'What did you say, sunny?', {});
    }
  }
  res.sendStatus(200);
});
