import jose from "jsonwebtoken";
import env from "../config/environments.js";
import { invalidToken, invalidRequest } from "../middlewares/http-errors.js";

const { sign, verify } = jose;
const { jwt } = env;

export const generateAccessToken = (userId) => {
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

export const generateRefreshToken = (userId) => {
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

export const decodeAccessToken = (token) => {
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

export const decodeRefreshToken = (token) => {
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
