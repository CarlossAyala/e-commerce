const validateSchema = require("./api/validate-schema");
const authentication = require("./auth/authentication");
const authorization = require("./auth/authorization");
const JWT = require("./auth/jwt");

module.exports = {
  JWT,
  validateSchema,
  authentication,
  authorization,
};
