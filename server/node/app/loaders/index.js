const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');
const logger = require('../helpers/logging');

const init = async (app) => {
  logger.info('Calling loaders...')
  await mongooseLoader();
  logger.info('MongoDB initialized')
  await expressLoader(app);
  logger.info('Express initialized')
};

module.exports = {
  init
}