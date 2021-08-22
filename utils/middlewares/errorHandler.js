const boom = require("@hapi/boom");
const { config } = require("../../config");

function withErrorStack(errorPayload, stack) {
  if (config.dev) {
    return { ...errorPayload, stack };
  }

  return errorPayload;
}

function logErrors(err, req, res, next) {
  const debug = require("debug")("app:error");
  debug(err);
  next(err);
}

function wrapErrors(err, req, res, next) {

  // Used to not expose the error to the client
  if (!err.isBoom) {
    next(boom.badImplementation(err.message));
  }

  next(err);
}

function errorHandler(err, req, res, next) {//eslint-disable-line

  const {
    output: { statusCode, payload },
  } = err;

  console.log(err);

  res.status(statusCode || 500);
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  errorHandler,
  wrapErrors,
};
