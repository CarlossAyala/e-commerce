const { env } = require("../../config/environments");
const { notFound } = require("./http-errors");

const isProduction = env === "production";

const catch404AndForward = (_req, _res, next) => {
  next(notFound());
};

// production (no stacktraces leaked to user)
// development (will print stacktrace)
// eslint-disable-next-line no-unused-vars
const handlerError = (err, req, res, next) => {
  if (isProduction) {
    res.status(err.statusCode || 500).json({
      message: err.message,
    });

    return;
  }

  console.log(err);
  res.status(err.statusCode || 500).json({
    message: err.message,
    stack: err.stack,
  });
};

module.exports = {
  catch404AndForward,
  handlerError,
};
