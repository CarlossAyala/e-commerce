// eslint-disable-next-line no-unused-vars
const express = require("express");
const { unauthorized, forbidden } = require("../api/http-errors");
const { decodeAccessToken } = require("../../utils");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const validateAccessToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(
      unauthorized(
        "Missing authorization header. Please provide an access token."
      )
    );
  }

  const accessToken = authorization.split(" ")[1];
  if (!accessToken) {
    return next(
      unauthorized("Missing access token. Please provide an access token.")
    );
  }

  try {
    const { userId } = await decodeAccessToken(accessToken).catch(() => {
      throw forbidden("You are not authorized to access this resource.");
    });
    req.auth = { userId };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateAccessToken;
