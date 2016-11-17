'use strict';

const assert = require('assert');
const app = require('../../../src/app');
const omit = require('lodash/omit');
const data = require('../../../src/services/questions/questions.json');

let service, defaultQuestions, pizzaQuestions;

const removeId = d => omit(d, 'id');

describe('questions service', () => {
  beforeEach(() => {
    service = app.service('questions');

    defaultQuestions = data.filter(q => q.category === '*');
    pizzaQuestions = data.filter(q => q.category === 'Pizza');
  });

  describe('find', () => {
    it('returns questions with `category: "*"` by default', () => {
      return service
        .find({ query: {} })
        .then(results => {
          assert.deepEqual(results.map(removeId), defaultQuestions, 'should get default questions');
        });
    });

    it('filter by category', () => {
      return service
        .find({ query: { category: 'Pizza' } })
        .then(results => {
          assert.deepEqual(results.map(removeId), defaultQuestions.concat(pizzaQuestions), 'should get default questions + questions for category');
        });
    });
  });
});
