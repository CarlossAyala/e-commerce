// eslint-disable-next-line no-unused-vars
import express from "express";
import { invalidRequest } from "./http-errors.js";
import { decodeAccessToken } from "../utils/index.js";

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 */
export const validateAccessToken = async (req, _res, next) => {
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
