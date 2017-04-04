'use strict';

const {Wit} = require('node-wit');
const request = require('request');

const sendMessageToFB = require('./sendMessageToFB');

const client = new Wit({
  accessToken: process.env.WIT_TOKEN,
  actions: {
    send({sessionId}, {text}) {
      sendMessageToFB(sessionId, {text});
      return new Promise(function(resolve, reject) {
        return resolve();
      });
    }
  }
});

module.exports = client;
