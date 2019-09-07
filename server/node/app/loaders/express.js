const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { logRequestsToFile, logResponsesToConsole, logResponsesToFile } = require('../config/morgan-config');
const { handleError } = require('../helpers/error');
const taskController = require('../controllers/task-controller');

const expressLoader = async (app) => {
  app.use(logResponsesToConsole(morgan));
  app.use(logRequestsToFile(morgan));
  app.use(logResponsesToFile(morgan));
  app.use(express.json());
  app.use(helmet());
  app.use(cors());

  app.use('/api/v1/tasks', taskController);

  app.use((err, _req, res, _next) => handleError(err, res));

  return app;
}

module.exports = expressLoader;