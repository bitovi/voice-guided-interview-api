'use strict';

const setDefaultQueryParams = require('./setDefaultQueryParams');
const addDefaultResults = require('./addDefaultResults');

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');

exports.before = {
  all: [],
  find: [setDefaultQueryParams()],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [addDefaultResults()],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
