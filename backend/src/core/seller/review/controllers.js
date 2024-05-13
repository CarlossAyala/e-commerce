// eslint-disable-next-line no-unused-vars
import express from "express";
import Sequelize from "sequelize";
import { QueryBuilder } from "../../../libs/index.js";
import {
  Review,
  OrderItem,
  Product,
} from "../../../database/mysql/models/index.js";
import { notFound } from "../../../middlewares/index.js";

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} productId
 */
export const validateProductId = async (req, _res, next, productId) => {
  const { store } = req;

  try {
    const product = await Product.model.findByPk(productId, {
      where: {
        storeId: store.id,
      },
    });
    if (!product) {
      throw notFound("Product not found");
    }

    req.product = product;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const findAll = async (req, res, next) => {
  const { store } = req;

  const { where: whereProduct } = new QueryBuilder(req.query)
    .where("storeId", store.id)
    .whereLike("name", req.query.q)
    .build();
  const { limit, offset } = new QueryBuilder(req.query).pagination().build();

  try {
    const reviews = await Review.model.findAndCountAll({
      include: {
        model: OrderItem.model,
        as: "item",
        include: {
          model: Product.model,
          as: "product",
          where: whereProduct,
        },
        required: true,
      },
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const findAllByProductId = async (req, res, next) => {
  const { productId } = req.params;

  const { limit, offset } = new QueryBuilder(req.query).pagination().build();

  const { where: whereReview } = new QueryBuilder(req.query)
    .whereLike("description", req.query.q)
    .build();

  try {
    const reviews = await Review.model.findAndCountAll({
      where: whereReview,
      include: {
        model: OrderItem.model,
        as: "item",
        include: {
          model: Product.model,
          as: "product",
          where: {
            id: productId,
          },
        },
        required: true,
      },
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const avgRatingByProductId = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const result = await Review.model.findOne({
      attributes: [
        [Sequelize.fn("AVG", Sequelize.col("rating")), "rating"],
        [Sequelize.fn("COUNT", Sequelize.col("Review.id")), "count"],
      ],
      include: {
        model: OrderItem.model,
        as: "item",
        attributes: [],
        include: {
          model: Product.model,
          as: "product",
          where: {
            id: productId,
          },
        },
        required: true,
      },
      group: ["item.product_id"],
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};
