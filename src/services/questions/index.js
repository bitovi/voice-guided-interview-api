'use strict';

const service = require('feathers-memory');
const hooks = require('./hooks');
const questions = require('./questions.json');

module.exports = function(){
  const app = this;

  let options = {};

  // Initialize our service with any options it requires
  app.use('/questions', service(options));

  // Get our initialize service to that we can bind hooks
  const questionsService = app.service('/questions');

  // Set up our before hooks
  questionsService.before(hooks.before);

  // Set up our after hooks
  questionsService.after(hooks.after);

  // Set up data
  questionsService.create(questions);
};
