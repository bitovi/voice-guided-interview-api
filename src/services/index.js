'use strict';
const questions = require('./questions');

module.exports = function() {
  const app = this;

  app.configure(questions);
};
