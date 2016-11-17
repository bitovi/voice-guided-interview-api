'use strict';

module.exports = function(options) {
  return function(hook) {
    return new Promise((resolve, reject) => {
      if (hook.params.query.category === '*') {
        resolve(hook);
        return;
      }

      // if category is set, add questions for `category: '*'`
      this
        .find({ query: { category: '*' } })
        .then(defaultQuestions => {
          hook.result = defaultQuestions.concat(hook.result);
          resolve(hook);
        });
    });
  };
};
