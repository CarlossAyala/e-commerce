// eslint-disable-next-line no-unused-vars
import express from "express";
import { Store, StoreImage } from "../database/mysql/models/index.js";
import { badRequest } from "./http-errors.js";

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 */
export const authStore = async (req, _res, next) => {
  const { userId } = req.auth;

  try {
    const store = await Store.model.findOne({
      where: { sellerId: userId },
      include: {
        model: StoreImage.model,
        as: "gallery",
        order: [["order", "ASC"]],
        separate: true,
        required: false,
      },
    });
    if (!store) {
      throw badRequest("You are not authorized to perform this action");
    }

    req.store = store;
    next();
  } catch (error) {
    next(error);
  }
};
