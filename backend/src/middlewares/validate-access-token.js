// eslint-disable-next-line no-unused-vars
const express = require("express");
const { invalidRequest } = require("./http-errors");
const { decodeAccessToken } = require("../utils");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 */
const validateAccessToken = async (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(invalidRequest("Missing authorization header."));
  }

  const accessToken = authorization.split(" ")[1];
  if (!accessToken) {
    return next(
      invalidRequest("Missing access token in authorization header.")
    );
  }

  try {
    const { userId } = await decodeAccessToken(accessToken);

    req.auth = { userId };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateAccessToken;
