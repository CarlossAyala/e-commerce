// eslint-disable-next-line no-unused-vars
import express from "express";
import { Product } from "../../../database/mysql/models/index.js";

/**
 * @param {express.Request} _req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getCount = async (_req, res, next) => {
  try {
    const count = await Product.model.count();

    res.json(count);
  } catch (error) {
    next(error);
  }
};

export default {
  getCount,
};
