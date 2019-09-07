const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./app/db');
const taskController = require('./app/controllers/task-controller');
const logger = require('./app/helpers/logging');
const { logRequestsToFile, logResponsesToConsole, logResponsesToFile } = require('./app/config/morgan-config');
const { handleError } = require('./app/helpers/error');

const PORT = process.env.APP_SERVER_NODE_PORT || 8080;
const app = express();

app.use(logResponsesToConsole(morgan));
app.use(logRequestsToFile(morgan));
app.use(logResponsesToFile(morgan));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/api/v1/tasks', taskController);

app.use((err, _req, res, _next) => handleError(err, res));

db.connect().then(async () => {
  app.listen(PORT, () => {
    logger.info(`App listening on port ${PORT}`)
  });
}).catch(error => logger.error('Couldn\'t connect to the database', error));

