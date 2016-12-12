'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const classifierHooks = require('./classifier');

exports.before = {
  all: [],
  find: [ classifierHooks.getClassifications() ],
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
  create: [ classifierHooks.train() ],
  update: [],
  patch: [],
  remove: []
};
