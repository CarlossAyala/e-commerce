const { env } = require("../../config/environments");

// eslint-disable-next-line no-unused-vars
const handlerError = (err, _req, res, _next) => {
  const isProduction = env === "production";

  if (err.isBoom) {
    const { output } = err;
    return res
      .status(output.statusCode)
      .json({ ...output.payload, ...(!isProduction && { stack: err.stack }) });
  } else {
    const status = err.status || 500;
    const error = err.error || "Internal Server Error";

    return res.status(status).json({
      message: "Internal Server Error",
      error,
      ...(!isProduction && { stack: err.stack }),
    });
  }
};

module.exports = handlerError;
