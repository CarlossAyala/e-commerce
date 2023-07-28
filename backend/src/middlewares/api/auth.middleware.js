const Boom = require('@hapi/boom');
const jsonwebtoken = require('jsonwebtoken');

const { jwt_secret } = require('../../config');

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, jwt_secret, (err, decoded) => {
      if (err) return reject(err);

      resolve(decoded);
    });
  });
};

const validateJWT = ({ optional = false } = {}) => {
  return async (req, res, next) => {
    // console.log('Headers', req.headers);
    const authHeader = req.headers.authorization;
    // console.log('authHeader', authHeader);
    const token = authHeader ? authHeader.split(' ')[1] : null;
    // console.log('token', token);

    if (optional) {
      if (authHeader && token) {
        try {
          const decoded = await verifyToken(token);
          req.auth = decoded;
          next();
        } catch (error) {
          next();
        }
      } else {
        next();
      }
    }

    if (!authHeader) {
      return next(Boom.unauthorized('Missing Authorization Header'));
    }
    if (!token) {
      return next(Boom.unauthorized('Missing Authorization Token'));
    }

    try {
      const decoded = await verifyToken(token);
      req.auth = decoded;
      next();
    } catch (error) {
      return next(Boom.unauthorized('Invalid Authorization Token'));
    }
  };
};

module.exports = {
  validateJWT,
};
