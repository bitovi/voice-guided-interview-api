'use strict';

const assert = require('assert');
const request = require('request');
const app = require('../src/app');

describe('Feathers application tests', function() {
  before(function(done) {
    this.server = app.listen(3030);
    this.server.once('listening', () => done());
  });

  after(function(done) {
    this.server.close(done);
  });

});
