const { config } = require("../../config");
// const Sentry = require("@sentry/node");

// Sentry.init({
//   dsn: `https://${config.sentryDns}@sentry.io/${config.sentryId}`,
// });

function logErrors(err, req, res, next) {
  // Sentry.captureException(err);
  console.log(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  // Catch Erros for AJAX Request
  if (req.xhr) {
    res.status(500).json({ err: err.message });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  // Catch Errors while streaming
  if (res.headersSent) {
    next(err);
  }
  if (!config.dev) {
    delete err.stack;
  }

  res.status(err.status || 500);
  res.render("error", { error: err });
}

module.exports = {
  errorHandler,
  clientErrorHandler,
  logErrors,
};
