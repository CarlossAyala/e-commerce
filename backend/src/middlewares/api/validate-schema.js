const Boom = require("@hapi/boom");

/**
 *
 * @param {import("joi").ObjectSchema} schema
 * @param {"params"|"body"|"query"} property
 * @returns {import("express").RequestHandler}
 */
function validateSchema(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      return next(Boom.badRequest(error));
    }
    next();
  };
}

module.exports = validateSchema;
