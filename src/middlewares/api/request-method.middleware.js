const Boom = require('@hapi/boom');

/*
  We need to do this to ensure that attackers cannot utilize the TRACE HTTP method to access our httpOnly cookies (TRACE doesn't respect this rule). To do it, we're going to rely on a custom Express middleware that will automatically block TRACE requests from any client (browser or otherwise).
*/

module.exports = function requestMethod(req, res, next) {
  // NOTE: Exclude TRACE and TRACK methods to avoid XST attacks.
  const allowedMethods = [
    'OPTIONS',
    'HEAD',
    'CONNECT',
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
  ];

  if (!allowedMethods.includes(req.method))
    return next(Boom.methodNotAllowed());

  next();
};
