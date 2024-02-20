const { sign, verify } = require("jsonwebtoken");
const { jwt } = require("../config/environments");
const { invalidToken, invalidRequest } = require("../middlewares/http-errors");

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
          reject(err);
        } else {
          resolve(token);
        }
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
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

const decodeAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    verify(token, jwt.access_token.secret, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          reject(invalidToken("Your session has expired."));
        } else if (err.name === "JsonWebTokenError") {
          reject(invalidRequest("Invalid access token."));
        } else {
          reject(invalidToken("Your session has not started yet."));
        }
      } else {
        resolve(decoded);
      }
    });
  });
};

const decodeRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    verify(token, jwt.refresh_token.secret, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          reject(invalidToken("Your session has expired."));
        } else if (err.name === "JsonWebTokenError") {
          reject(invalidRequest("Invalid access token."));
        } else {
          reject(invalidToken("Your session has not started yet."));
        }
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = {
  generateRefreshToken,
  generateAccessToken,
  decodeRefreshToken,
  decodeAccessToken,
};
