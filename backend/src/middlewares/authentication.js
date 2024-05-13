// eslint-disable-next-line no-unused-vars
import express from "express";
import { unauthorized } from "./http-errors.js";
import { User } from "../database/mysql/models/index.js";

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 */
export const authentication = async (req, _res, next) => {
  const { userId } = req.auth;

  try {
    const user = await User.model.findByPk(userId, {
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) {
      throw unauthorized("You are not authorized to access this resource.");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
