const Boom = require("@hapi/boom");
const jsonwebtoken = require("jsonwebtoken");

const { jwt } = require("../../config");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, jwt.secret, (err, decoded) => {
      if (err) return reject(err);

      resolve(decoded);
    });
  });
};

const verify = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(" ")[1] : null;

  if (!authHeader) {
    return next(Boom.unauthorized("Missing Authorization Header"));
  }
  if (!token) {
    return next(Boom.unauthorized("Missing Authorization Token"));
  }

  try {
    const decoded = await verifyToken(token);
    req.auth = decoded;
    next();
  } catch (error) {
    return next(Boom.unauthorized("Invalid Authorization Token"));
  }
};

const sign = (payload) => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(payload, jwt.secret, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
};

const JWT = {
  verify,
  sign,
};

module.exports = JWT;
