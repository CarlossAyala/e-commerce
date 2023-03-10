const Boom = require('@hapi/boom');

function Catch404AndForward(req, res, next) {
  return next(Boom.notFound('Not Found'));
}

module.exports = Catch404AndForward;
