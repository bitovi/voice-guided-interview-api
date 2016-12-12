'use strict';
const answers = require('./answers');
const questions = require('./questions');

module.exports = function() {
  const app = this;

  app.configure(questions);
  app.configure(answers);
};
