// eslint-disable-next-line no-unused-vars
const express = require("express");
const Sequelize = require("sequelize");
const { QueryBuilder } = require("../../../libs");
const {
  Review,
  OrderItem,
  Product,
} = require("../../../database/mysql/models");
const { notFound } = require("../../../middlewares");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} productId
 */
const validateProductId = async (req, _res, next, productId) => {
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
const findAll = async (req, res, next) => {
  const { store } = req;
  const { where, limit, offset } = new QueryBuilder(req.query)
    .where("storeId", store.id)
    .whereLike("name", req.query.q)
    .pagination()
    .build();

  try {
    const reviews = await Review.model.findAndCountAll({
      include: {
        model: OrderItem.model,
        as: "item",
        include: {
          model: Product.model,
          as: "product",
          where,
        },
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
const findAllByProductId = async (req, res, next) => {
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
const avgRatingByProductId = async (req, res, next) => {
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
      },
      group: ["item.product_id"],
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateProductId,
  findAll,
  findAllByProductId,
  avgRatingByProductId,
};
