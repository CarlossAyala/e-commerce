const { sign, verify } = require("jsonwebtoken");
const { jwt } = require("../config/environments");

const generateAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    sign(
      { userId },
      jwt.access_token.secret,
      {
        expiresIn: jwt.access_token.expire,
      },
      (err, token) => {
        if (err) {
          return reject(err);
        }

        resolve(token);
      }
    );
  });
};

const generateRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    sign(
      { userId },
      jwt.refresh_token.secret,
      {
        expiresIn: jwt.refresh_token.expire,
      },
      (err, token) => {
        if (err) {
          return reject(err);
        }

        resolve(token);
      }
    );
  });
};

const decodeAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    verify(token, jwt.access_token.secret, (err, decoded) => {
      if (err) {
        return reject(err);
      }

      resolve(decoded);
    });
  });
};

const decodeRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    verify(token, jwt.refresh_token.secret, (err, decoded) => {
      if (err) {
        return reject(err);
      }

      resolve(decoded);
    });
  });
};

module.exports = {
  generateRefreshToken,
  generateAccessToken,
  decodeRefreshToken,
  decodeAccessToken,
};
