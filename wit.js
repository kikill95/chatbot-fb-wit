'use strict';

const {Wit} = require('node-wit');
const request = require('request');

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

// generic function sending messages
function sendMessageToFB(recipientId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
    method: 'POST',
    json: {
      recipient: {id: recipientId},
      message: message,
    }
  }, (error, response, body) => {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

module.exports = client;
