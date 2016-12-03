'use strict';

const service = require('feathers-memory');
const hooks = require('./hooks');

module.exports = function createClassifierService(app, path, options){
  // Initialize our service with any options it requires
  app.use(path, service(options));

  // Get our initialize service to that we can bind hooks
  const voiceService = app.service(path);

  // add passed options on to service
  Object.assign(voiceService, options);

  // Set up our before hooks
  voiceService.before(hooks.before);

  // Set up our after hooks
  voiceService.after(hooks.after);
};
