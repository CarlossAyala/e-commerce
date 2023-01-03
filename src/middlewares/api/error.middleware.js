const { env } = require('../../config');

// Error handlers
// development error handler - will print stacktrace
// production error handler - no stacktraces leaked to user

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const isDevEnv = env === 'dev';

  // Log
  // console.error(err);

  let status = err.status || 400;
  let message = err.message || 'Something went wrong';

  if (err.isBoom) {
    status = err.output.statusCode;
    message = err.output.payload.message;
  }

  // if()
  console.log('TEST', err);

  // Handle Error from Server
  const error = isDevEnv ? err : {};

  res.status(status).json({
    status,
    message,
    error,
  });
}

module.exports = errorHandler;
