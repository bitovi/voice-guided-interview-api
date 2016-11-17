'use strict';

const defaults = { category: '*' };

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    hook.params.query = Object.assign({}, options, hook.params.query);
  };
};
