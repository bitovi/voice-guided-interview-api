'use strict';

const flatMap = require('lodash/flatMap');

module.exports = function(options) {
  return function(hook) {
    const answersService = hook.app.service('answers');
    const answers = flatMap(hook.data, q => q.options.map(opt => ({ t: opt, answer: opt})));
    answersService.create(answers);
  };
};
