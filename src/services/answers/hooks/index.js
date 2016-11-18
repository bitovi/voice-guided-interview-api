'use strict';

const globalHooks = require('../../../hooks');
const classifier = require('../../../classifier');
const hooks = require('feathers-hooks');

exports.before = {
  all: [],
  find: [ classifier.getClassificationsHook({ textProp: 't' }) ],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [ classifier.trainHook({ textProp: 't', classificationProp: 'answer' }) ],
  update: [],
  patch: [],
  remove: []
};
