const boom = require("boom");
const { config } = require("../../config");
const isRequestAjaxOrApi = require("../isRequestAjaxOrApi");

// const Sentry = require("@sentry/node");

// Sentry.init({
//   dsn: `https://${config.sentryDns}@sentry.io/${config.sentryId}`,
// });

function withErrorStack(err, stack) {
  if (config.dev) {
    return { ...err, stack }; // Object.assign({}, err, stack)
  }
}

function logErrors(err, req, res, next) {
  // Sentry.captureException(err);
  console.log(err.stack);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}
function clientErrorHandler(err, req, res, next) {
  // Catch Erros for AJAX Request or if a error occurs while streaming
  if (isRequestAjaxOrApi(req) || res.headersSent) {
    res.status(statusCode).json(whitErrorStack(payload, err.stack));
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;

  res.status(statusCode);
  res.render("error", withErrorStack(payload, err.stack));
}

module.exports = {
  errorHandler,
  wrapErrors,
  clientErrorHandler,
  logErrors,
};
