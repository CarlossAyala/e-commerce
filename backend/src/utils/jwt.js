const jsonwebtoken = require("jsonwebtoken");
const { jwt } = require("../config");
const { Unauthorized } = require("./http-errors");

const generateAccessToken = (userId) => {
  return jsonwebtoken.sign({ userId }, jwt.access_token.secret, {
    expiresIn: jwt.access_token.expire,
  });
};

const generateRefreshToken = (userId) => {
  return jsonwebtoken.sign({ userId }, jwt.refresh_token.secret, {
    expiresIn: jwt.refresh_token.expire,
  });
};

const verifyAccessToken = (token) => {
  return jsonwebtoken.verify(token, jwt.access_token.secret, (err, decoded) => {
    if (err) throw new Unauthorized();
    return decoded;
  });
};

const verifyRefreshToken = (token) => {
  return jsonwebtoken.verify(
    token,
    jwt.refresh_token.secret,
    (err, decoded) => {
      if (err) throw new Unauthorized();
      return decoded;
    },
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
