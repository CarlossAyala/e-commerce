const validateSchema = require("./api/validate-schema");
const authentication = require("./auth/authentication");
const authorization = require("./auth/authorization");
const restrictMethods = require("./api/restrict-methods");
const handlerError = require("./api/handler-errors");
const logger = require("./api/logger");
const validateAccessToken = require("./auth/validate-access-token");
const httpErrors = require("./api/http-errors");

module.exports = {
  validateSchema,
  authentication,
  authorization,
  restrictMethods,
  ...handlerError,
  ...httpErrors,
  logger,
  validateAccessToken,
};
