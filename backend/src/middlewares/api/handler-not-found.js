const Boom = require("@hapi/boom");

const handlerNotFound = (req, _res, next) => {
  next(Boom.notFound());
};

module.exports = handlerNotFound;
