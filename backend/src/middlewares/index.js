const validateSchema = require("./api/validate-schema");
const authentication = require("./auth/authentication");
const authorization = require("./auth/authorization");
const restrictMethods = require("./api/restrict-methods");
const handlerNotFound = require("./api/handler-not-found");
const handlerError = require("./api/handler-error");
const logger = require("./api/logger");
const validateAccessToken = require("./auth/validate-access-token");

module.exports = {
  validateSchema,
  authentication,
  authorization,
  restrictMethods,
  handlerNotFound,
  handlerError,
  logger,
  validateAccessToken,
};
