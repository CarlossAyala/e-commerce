const { env } = require("../config/environments");
const { notFound, STATUS_CODES } = require("./http-errors");

const isProduction = env === "production";

const catch404AndForward = (_req, _res, next) => {
  next(notFound());
};

// production (no stacktraces leaked to user)
// development (will print stacktrace)
// eslint-disable-next-line no-unused-vars
const handlerError = (err, req, res, next) => {
  const {
    name = "Error",
    message = "Interval server error",
    statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR,
    stack,
  } = err;

  if (isProduction) {
    res.status(statusCode).json({
      error: name,
      message,
    });

    return;
  }

  console.log(err);
  res.status(statusCode).json({
    error: name,
    message,
    stack,
  });
};

module.exports = {
  catch404AndForward,
  handlerError,
};
