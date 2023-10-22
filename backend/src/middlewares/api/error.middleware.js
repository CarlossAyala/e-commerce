const { env } = require("../../config");

// eslint-disable-next-line no-unused-vars
function ErrorHandler(err, req, res, next) {
  // const isDevEnv = env === "dev";
  const isDevEnv = true;

  let status = err.status || 500;
  let message = err.message;

  if (err.isBoom) {
    status = err.output.statusCode;
    message = err.output.payload.message;
  }

  res.status(status).json({
    status,
    message,
    ...(isDevEnv && { stack: err.stack }),
  });
}

module.exports = ErrorHandler;
