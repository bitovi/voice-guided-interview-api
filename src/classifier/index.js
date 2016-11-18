'use strict';

const BrainJSClassifier = require('natural-brain');

const debug = require('debug')('VGI:classifier');

class Classifier {
  trainHook({ textProp, classificationProp }) {
    const classifier = this;

    return function(hook) {
      const service = this;
      classifier._classifier = new BrainJSClassifier();

      debug(`params: ${JSON.stringify(hook.params)}, result: ${JSON.stringify(hook.result)}`);

      return service
        .find({ query: { useClassifier: false }})
        .then(results => {
          debug(`results: ${JSON.stringify(results)}`);

          results.forEach(({ [textProp]: text, [classificationProp]: classification }) => {
            debug(`adding classification: ${text} => ${classification}`);
            classifier._classifier.addDocument(text, classification);
          });

          classifier._classifier.train();
        });
    };
  }

  getClassificationsHook({ textProp }) {
    const classifier = this;
    const normalize = ans => ({ answer: ans.label, certainty: ans.value });
    const byCertainty = (a, b) => b.certainty - a.certainty;

    return function(hook) {
      const { [ textProp ]: text, useClassifier = true } = hook.params.query;
      debug(`getting classifications for ${text} ${!useClassifier ? 'NOT using classifier' : 'using classifier'}`);

      if (!useClassifier) {
        delete hook.params.query.useClassifier;
        return;
      }

      hook.result = classifier._classifier
        .getClassifications(text)
        .map(normalize)
        .sort(byCertainty);
    };
  }
}

module.exports = new Classifier();
