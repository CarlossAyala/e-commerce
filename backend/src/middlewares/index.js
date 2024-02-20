const validateSchema = require("./validate-schema");
const authentication = require("./authentication");
const restrictMethods = require("./restrict-methods");
const handlerError = require("./handler-errors");
const logger = require("./logger");
const validateAccessToken = require("./validate-access-token");
const httpErrors = require("./http-errors");

module.exports = {
  validateSchema,
  authentication,
  restrictMethods,
  ...handlerError,
  ...httpErrors,
  logger,
  validateAccessToken,
};
