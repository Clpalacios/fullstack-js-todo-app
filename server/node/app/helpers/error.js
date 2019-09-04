const mongoose = require('mongoose');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

class BaseErrorResponse {
  status;
  statusCode;

  constructor(statusCode) {
    this.status = 'error';
    this.statusCode = statusCode;
  }
}

class ErrorResponse extends BaseErrorResponse {
  constructor(statusCode, message) {
    super(statusCode);
    this.message = message;
  }
}

class FieldError {
  constructor(field, message) {
    this.field = field;
    this.message = message;
  }
}

class ValidationErrorResponse extends BaseErrorResponse {
  constructor(fieldErrors, globalErrors) {
    super(422);
    this.fieldErrors = fieldErrors;
    this.globalErrors = globalErrors;
  }
}

const handleError = (error, res) => {
  let response;

  if (error instanceof mongoose.Error.ValidationError) {
    const fieldErrors = [];

    for (field in error.errors) {
      fieldErrors.push(new FieldError(field, error.errors[field].message));
    }

    response = new ValidationErrorResponse(fieldErrors, []);
  } else {
    response = new ErrorResponse(error.statusCode, error.message);
  }

  console.error(error.message);
  res.status(response.statusCode).json(response);
};

module.exports = {
  ErrorHandler,
  handleError
};