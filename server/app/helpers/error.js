const mongoose = require('mongoose');
const logger = require('./logging');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

class ResourceNotFound extends Error {
  constructor(message) {
    super();
    this.statusCode = 404;
    this.message = message;
  }
}

class FieldError {
  constructor(field, message) {
    this.field = field;
    this.message = message;
  }
}

class BaseErrorResponse {
  constructor(type) {
    this.type = type;
  }
}

class ErrorResponse extends BaseErrorResponse {
  constructor(type, message) {
    super(type);
    this.message = message;
  }
}

class ValidationErrorResponse extends BaseErrorResponse {
  constructor(type, fieldErrors) {
    super(type);
    this.fieldErrors = fieldErrors;
  }
}

const handleErrorAsync = func => async (req, res, next) => {
  func(req, res, next).catch(error => next(error));
};

const handleError = (error, res) => {
  let response;
  let statusCode = 400;

  switch (true) {
    case error instanceof mongoose.Error.ValidationError:
      const fieldErrors = [];

      for (field in error.errors) {
        fieldErrors.push(new FieldError(field, error.errors[field].message));
      }

      response = new ValidationErrorResponse(error.name, fieldErrors);
      break;

    case error instanceof mongoose.Error.CastError:
      response = new ErrorResponse(error.name, error.message);
      break;

    default:
      if (error.statusCode === 404) {
        statusCode = 404;
        response = new ErrorResponse('Resource Not Found', error.message);
      } else {
        statusCode = 500;
        response = new ErrorResponse('Internal Server Error.', 'Internal Server Error.');
      }
      break;
  }

  if (process.env.NODE_ENV !== 'test') {
    logger.error(error.message);
  }

  res.status(statusCode).json(response);
};

module.exports = {
  ErrorHandler,
  ResourceNotFound,
  handleError,
  handleErrorAsync
};