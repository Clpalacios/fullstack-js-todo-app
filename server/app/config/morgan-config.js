const rfs = require('rotating-file-stream');
const { getFormattedDate } = require('../utils/date-utils');

const logStream = rfs(`${getFormattedDate()}.log`, {
  interval: "1d",
  compress: "gzip",
  path: 'logs'
});

const logRequestsToFile = morgan => {
  return morgan(
    ':date[clf] [request]  ":method :url" | :remote-addr HTTP/:http-version :user-agent',
    { immediate: true, stream: logStream }
  );
}

const logResponsesToConsole = morgan => {
  return morgan(':date[clf] :method :url :status | :res[content-length] bytes - :response-time ms');
}

const logResponsesToFile = morgan => {
  return morgan(
    `:date[clf] [response] ":status :url" | :res[content-length] bytes :response-time ms`,
    { stream: logStream }
  );
}

module.exports = {
  logRequestsToFile,
  logResponsesToConsole,
  logResponsesToFile,
}