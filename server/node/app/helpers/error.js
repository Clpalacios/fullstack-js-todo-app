const mongoose = require('mongoose');
const logger = require('./logging');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
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
  type;
  statusCode;

  constructor(type, statusCode) {
    this.type = type;
    this.statusCode = statusCode;
  }
}

class ErrorResponse extends BaseErrorResponse {
  constructor(type, statusCode, message) {
    super(type, statusCode);
    this.message = message;
  }
}

class ValidationErrorResponse extends BaseErrorResponse {
  constructor(type, fieldErrors) {
    super(type, 422);
    this.fieldErrors = fieldErrors;
  }
}

const handleErrorAsync = func => async (req, res, next) => {
  try {
    await func(req, res, next)
  } catch (error) {
    next(error);
  }
};

const handleError = (error, res) => {
  let response;

  switch (true) {
    case error instanceof mongoose.Error.ValidationError:
      const fieldErrors = [];

      for (field in error.errors) {
        fieldErrors.push(new FieldError(field, error.errors[field].message));
      }

      response = new ValidationErrorResponse(error.name, fieldErrors);
      break;

    case error instanceof mongoose.Error.CastError:
      response = new ErrorResponse(error.name, 500, error.message);
      break;

    default:
      if (error.statusCode === 404) {
        response = new ErrorResponse('Resource Not Found', error.statusCode, error.message);
      } else {
        response = new ErrorResponse('Internal Server Error.', 500, 'Internal Server Error.');
      }
      break;
  }

  logger.error(error.message);
  res.status(response.statusCode).json(response);
};

module.exports = {
  ErrorHandler,
  handleError,
  handleErrorAsync
};