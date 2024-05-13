// eslint-disable-next-line no-unused-vars
import express from "express";
import { QueryBuilder } from "../../../libs/index.js";
import {
  History,
  Product,
  ProductImage,
} from "../../../database/mysql/models/index.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const findAll = async (req, res, next) => {
  const { userId } = req.auth;
  const { order, limit, offset } = new QueryBuilder(req.query)
    .orderBy("lastSeenAt", "DESC")
    .pagination()
    .build();

  try {
    const history = await History.model.findAndCountAll({
      where: {
        customerId: userId,
      },
      include: {
        model: Product.model,
        as: "product",
        include: {
          model: ProductImage.model,
          as: "gallery",
          separate: true,
          order: [["order", "ASC"]],
          required: false,
        },
      },
      order,
      limit,
      offset,
    });

    res.json(history);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const create = async (req, res, next) => {
  const { userId } = req.auth;
  const { productId } = req.params;

  try {
    const history = await History.model.findOne({
      where: {
        customerId: userId,
        productId,
      },
    });

    if (!history) {
      await History.model.create({
        customerId: userId,
        productId,
      });

      res.json({ message: "History created" });
    } else {
      await history.update({ lastSeenAt: new Date() });

      res.json({ message: "History updated" });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const clear = async (req, res, next) => {
  const { userId } = req.auth;

  try {
    await History.model.destroy({
      where: {
        customerId: userId,
      },
    });

    res.json({ message: "History cleared" });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const remove = async (req, res, next) => {
  const { userId } = req.auth;
  const { productId } = req.params;

  try {
    await History.model.destroy({
      where: {
        customerId: userId,
        productId,
      },
    });

    res.json({ message: "History removed" });
  } catch (error) {
    next(error);
  }
};
