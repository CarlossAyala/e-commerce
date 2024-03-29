const { badRequest } = require("./http-errors");

/**
 *
 * @param {import("joi").ObjectSchema} schema
 * @param {"params"|"body"|"query"} property "body" as default
 * @returns {import("express").RequestHandler}
 */
function validateSchema(schema, property = "body") {
  return (req, _res, next) => {
    const data = req[property];
    const { error, value } = schema.validate(data, { abortEarly: false });
    if (error) {
      return next(badRequest(error.message));
    }
    req[property] = value;
    next();
  };
}

module.exports = validateSchema;
