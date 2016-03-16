'use strict';

const feathers = require('feathers');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const AnswerService = require('./services/answer');
const QuestionsService = require('./services/questions');
const ClassifyService = require('./services/classify');
const Classifier = require('./classifier');
const debug = require('debug')('VGI:app');

const PORT = 3030;

const classifier = new Classifier().getClassifier();
const answerService = new AnswerService(classifier);
const questionsService = new QuestionsService(classifier);
const classifyService = new ClassifyService(classifier);

// train classifier once all services have been created
classifier.train();

const app = feathers()
  .configure(rest())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }));

app.use('/answer', answerService);
app.use('/questions', questionsService);
app.use('/classify', classifyService);

app.listen(PORT, () => {
  console.log('server listening on port', PORT);
});
