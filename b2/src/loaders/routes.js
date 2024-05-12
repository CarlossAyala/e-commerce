const routes = require("../api/routes");

/**
 * @param {import("express").Express} app
 */
module.exports = (app) => {
  console.log("Loading Routes");
  app.use(routes);
};
