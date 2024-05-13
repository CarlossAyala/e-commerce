// eslint-disable-next-line no-unused-vars
import express from "express";
import { Op, Sequelize } from "sequelize";
import { notFound } from "../../../middlewares/index.js";
import { QueryBuilder } from "../../../libs/index.js";
import {
  Review,
  OrderItem,
  Order,
  Product,
  ProductImage,
} from "../../../database/mysql/models/index.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const findAllDone = async (req, res, next) => {
  const { userId } = req.auth;

  const { order, limit, offset } = new QueryBuilder(req.query)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const reviews = await Review.model.findAndCountAll({
      include: {
        model: OrderItem.model,
        as: "item",
        include: [
          {
            model: Order.model,
            as: "order",
            where: {
              customerId: userId,
            },
          },
          {
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
        ],
      },
      order,
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
export const findAllPending = async (req, res, next) => {
  const { userId } = req.auth;

  const { where: whereProduct } = new QueryBuilder()
    .whereLike("name", req.query.q)
    .build();

  const { order, limit, offset } = new QueryBuilder(req.query)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const reviews = await OrderItem.model.findAndCountAll({
      where: {
        reviewId: {
          [Op.is]: null,
        },
      },
      include: [
        {
          model: Order.model,
          as: "order",
          where: {
            customerId: userId,
          },
        },
        {
          model: Product.model,
          as: "product",
          where: whereProduct,
          include: {
            model: ProductImage.model,
            as: "gallery",
            separate: true,
            order: [["order", "ASC"]],
            required: false,
          },
        },
      ],
      order,
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
export const create = async (req, res, next) => {
  const { userId } = req.auth;
  const { orderItemId } = req.params;
  const { body } = req;

  try {
    const orderItem = await OrderItem.model.findByPk(orderItemId, {
      include: {
        model: Order.model,
        as: "order",
        where: {
          customerId: userId,
        },
      },
    });
    if (!orderItem) {
      throw notFound("Order item not found");
    }

    const review = await Review.model.create(body);

    await orderItem.update({
      reviewId: review.id,
    });

    res.json(review);
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

  try {
    const reviews = await Review.model.findAndCountAll({
      include: {
        model: OrderItem.model,
        as: "item",
        attributes: [],
        where: { productId },
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
export const productStats = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const result = await Review.model.findAll({
      attributes: [
        "rating",
        [Sequelize.fn("COUNT", Sequelize.col("rating")), "rating_count"],
      ],
      include: {
        model: OrderItem.model,
        as: "item",
        attributes: [],
        where: { productId },
      },
      group: ["rating"],
      raw: true,
    });

    const stats = new Map([
      [5, 0],
      [4, 0],
      [3, 0],
      [2, 0],
      [1, 0],
    ]);

    for (const { rating, rating_count } of result) {
      stats.set(rating, rating_count);
    }
    const count = result.reduce((acc, curr) => acc + curr.rating_count, 0);

    // calc % of each rating
    const levels = Array.from(stats.keys()).map((rating) => {
      const rating_count = stats.get(rating);

      return {
        rating,
        percentage: rating_count
          ? +Number((rating_count / count) * 100).toFixed(2)
          : 0,
        count: stats.get(rating),
      };
    });

    // calc average rating
    const average = result.length
      ? Number(
          result.reduce(
            (acc, curr) => acc + curr.rating * curr.rating_count,
            0
          ) / count
        ).toFixed(1)
      : 0;

    res.json({
      levels,
      average,
      count,
    });
  } catch (error) {
    next(error);
  }
};
