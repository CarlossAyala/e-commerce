// eslint-disable-next-line no-unused-vars
import express from "express";
import { unauthorized } from "./http-errors.js";

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 */
export const adminAuthentication = async (req, _res, next) => {
  const { user } = req;

  try {
    if (!user.isAdmin) {
      throw unauthorized("You are not authorized to access this resource.");
    }

    next();
  } catch (error) {
    next(error);
  }
};
