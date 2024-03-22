const validateSchema = require("./validate-schema");
const authentication = require("./authentication");
const restrictMethods = require("./restrict-methods");
const handlerError = require("./handler-errors");
const logger = require("./logger");
const validateAccessToken = require("./validate-access-token");
const httpErrors = require("./http-errors");
const authStore = require("./auth-store");
const checkStripeAccount = require("./check-stripe-account");
const adminAuthorization = require("./admin-authorization");

module.exports = {
  validateSchema,
  authentication,
  restrictMethods,
  ...handlerError,
  ...httpErrors,
  logger,
  validateAccessToken,
  authStore,
  checkStripeAccount,
  adminAuthorization,
};
