const express = require('express');
const loaders = require('./app/loaders');
const logger = require('./app/helpers/logging');

const PORT = process.env.APP_SERVER_NODE_PORT || 8080;

const app = express();

const startServer = async () => {
  await loaders.init(app);

  return app.listen(PORT, error => {
    if (error) logger.error(error);
    logger.info(`App listening on port ${PORT}`)
  });
}

startServer();

module.exports = app;