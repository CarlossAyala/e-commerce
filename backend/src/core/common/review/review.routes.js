const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const { Sequelize } = require("sequelize");
const { Product, Review } = require("../../../database/mysql/models");
const { validateSchema } = require("../../../middlewares");
const schemas = require("./review.schema");
const { QueryBuilder } = require("../../../libs");

router.get(
  "/:id",
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: reviewId } = req.params;

    try {
      const review = await Review.model.findByPk(reviewId);
      if (!review) {
        return next(Boom.notFound("Review not found"));
      }

      return res.status(200).json(review);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/product/:id",
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: productId } = req.params;
    const { where, order, limit, offset } = new QueryBuilder(req.query)
      .where("productId", productId)
      .where("status", Review.enums.status.done)
      .orderBy("updatedAt", "DESC")
      .pagination()
      .build();

    try {
      const product = await Product.model.findByPk(productId);
      if (!product) {
        return next(Boom.notFound("Product not found"));
      }

      const reviews = await Review.model.findAndCountAll({
        where,
        order,
        limit,
        offset,
      });

      return res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/product/:id/stats",
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: productId } = req.params;

    try {
      const product = await Product.model.findByPk(productId);
      if (!product) {
        return next(Boom.notFound("Product not found"));
      }

      const reviews = await Review.model.findAll({
        attributes: [
          "rating",
          [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
        ],
        where: {
          productId,
          status: Review.enums.status.done,
        },
        group: ["rating"],
        order: [["rating", "DESC"]],
      });

      let totalReviews = 0;
      let averageRating = 0;
      for (const review of reviews) {
        const { rating, count } = review.dataValues;
        totalReviews += count;
        averageRating += rating * count;
      }
      if (averageRating !== 0) {
        averageRating = Number(averageRating / totalReviews).toFixed(2);
      }

      const reviewsMap = new Map();
      for (let rating = 5; rating >= 1; rating--) {
        reviewsMap.set(rating, {
          rating,
          percentage: "0",
          count: 0,
        });
      }

      for (const review of reviews) {
        const { rating, count } = review.dataValues;
        reviewsMap.set(rating, {
          rating,
          percentage: Number((count / totalReviews) * 100).toFixed(2),
          count,
        });
      }

      return res.status(200).json({
        reviews: Array.from(reviewsMap.values()),
        total: totalReviews,
        average: averageRating,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
