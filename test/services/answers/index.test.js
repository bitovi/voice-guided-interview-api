'use strict';

const assert = require('assert');
const app = require('../../../src/app');
const omit = require('lodash/omit');

let service;

describe('answers service', () => {
  beforeEach(() => {
    service = app.service('answers');
  });

  it('find', () => {
    return service.find({ query: { t: 'Sandwich' } })
      .then(results => {
        assert.equal(results.length, 27, 'should have 1 result for each possible answer');
        assert.equal(results[0].answer, 'Sandwich', 'should find result with matching answer');
        assert.ok(results[0].certainty > 0.5, `certainty ${results[0].certainty} should be > 0.5 for sandwich`);
      })
      .then(() => service.find({ query: { t: 'sandwich' } }))
      .then(results => {
        assert.equal(results.length, 27, 'should also have 1 result for each possible answer');
        assert.equal(results[0].answer, 'Sandwich', 'should also find result with matching answer');
        assert.ok(results[0].certainty > 0.5, `certainty ${results[0].certainty} should also be > 0.5 for sandwich`);
      });
  });

  it('create', () => {
    return service.create({
      t: 'foo',
      classification: 'Sandwich'
    })
    .then(() => service.find({ query: { t: 'sandwich' } }))
    .then(results => {
      assert.equal(results[0].answer, 'Sandwich', 'should also find result with matching answer');
      assert.ok(results[0].certainty > 0.5, `certainty ${results[0].certainty} should also be > 0.5 for foo`);
    });
  });
});
