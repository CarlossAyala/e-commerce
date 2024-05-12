const { node_env } = require("../config");
const { NotFound } = require("../utils/http-errors");

/**
 * @param {import("express").Express} app
 */
module.exports = (app) => {
  console.log("Loading Error Handlers");

  app.use((_req, _res, next) => {
    next(new NotFound());
  });
  app.use((err, _req, res, _next) => {
    if (node_env === "development") {
      console.log(err);
      res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
      });
    } else {
      res.status(err.status || 500).json({
        message: err.message,
      });
    }
  });
};
