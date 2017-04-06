'use strict';

const {Wit} = require('node-wit');

const sendMessageToFB = require('./sendMessageToFB');

//Extract an entity value from the entities returned by Wit
const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const client = new Wit({
  accessToken: process.env.WIT_TOKEN,
  actions: {
    send({sessionId}, {text}) {
      sendMessageToFB(sessionId, {text});
      return new Promise(function(resolve, reject) {
        return resolve();
      });
    },
    definePlatform({context, entities}) {
      return new Promise(function(resolve, reject) {
        const platformTitle = firstEntityValue(entities, 'platform');
        if (platformTitle) {
          context.platform = platformTitle;
        }
        return resolve(context);
      });
    }
  }
});

module.exports = client;
