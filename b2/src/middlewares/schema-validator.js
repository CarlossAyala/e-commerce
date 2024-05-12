const { BadRequest } = require("../utils/http-errors");

const schemaValidator = (schema) => {
  return (req, _res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return next(new BadRequest(error));
    }

    req.body = value;
    next();
  };
};

module.exports = schemaValidator;
