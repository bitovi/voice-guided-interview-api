'use strict';

const BrainJSClassifier = require('natural-brain');
const debug = require('debug')('VGI:classifier/hooks/classifier');

module.exports = {
  train() {
    return function(hook) {
      const service = this;
      service._classifier = new BrainJSClassifier();

      debug(`params: ${JSON.stringify(hook.params)}, result: ${JSON.stringify(hook.result)}`);

      return service
        .find({ query: { useClassifier: false }})
        .then(results => {
          debug(`results: ${JSON.stringify(results)}`);

          results.forEach(({ [service.textProp]: text, [service.classificationProp]: classification }) => {
            debug(`adding classification: ${text} => ${classification}`);
            service._classifier.addDocument(text, classification);
          });

          service._classifier.train();
        });
    };
  },

  getClassifications() {
    const normalize = ans => ({ answer: ans.label, certainty: ans.value });
    const byCertainty = (a, b) => b.certainty - a.certainty;

    return function(hook) {
      const service = this;
      const { [ service.textProp ]: text, useClassifier = true } = hook.params.query;
      debug(`getting classifications for ${text} ${!useClassifier ? 'NOT using classifier' : 'using classifier'}`);

      if (!useClassifier) {
        delete hook.params.query.useClassifier;
        return;
      }

      hook.result = service._classifier
        .getClassifications(text)
        .map(normalize)
        .sort(byCertainty);
    };
  }
};
