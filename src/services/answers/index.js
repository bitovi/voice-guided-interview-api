'use strict';

const createClassifierService = require('../classifier');

module.exports = function(){
  const app = this;

  let options = {
    textProp: 't',
    classificationProp: 'answer'
  };

  createClassifierService(app, '/answers', options);
};
