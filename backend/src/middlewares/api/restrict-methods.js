/*
  We need to do this to ensure that attackers cannot utilize the TRACE HTTP method to access our httpOnly cookies (TRACE doesn't respect this rule). To do it, we're going to rely on a custom Express middleware that will automatically block TRACE requests from any client (browser or otherwise).
*/

const { methodNotAllowed } = require("./http-errors");

const allowedMethods = [
  "OPTIONS",
  "HEAD",
  "CONNECT",
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
];

const restrictMethods = (req, _res, next) => {
  if (!allowedMethods.includes(req.method)) {
    return next(methodNotAllowed());
  }

  next();
};

module.exports = restrictMethods;
