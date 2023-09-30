const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const { Sequelize } = require("sequelize");
const {
  Product,
  Review,
  ReviewLikeDislike,
} = require("../../../database/mysql/models");
const JWT = require("../../../middlewares/auth/jwt.auth");
const validatorSchema = require("../../../middlewares/api/validator.middleware");
const QueryBuilder = require("../../../utils/database/query-builder");
const schemas = require("./review.schema");

// Find one
router.get(
  "/:id",
  validatorSchema(schemas.resourceId, "params"),
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

// Find all
router.get(
  "/product/:id",
  validatorSchema(schemas.resourceId, "params"),
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

// Stats
router.get(
  "/product/:id/stats",
  validatorSchema(schemas.resourceId, "params"),
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

// Like
router.patch(
  "/:id/like",
  JWT.verify,
  validatorSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: customerId } = req.auth;
    const { id: reviewId } = req.params;

    try {
      const review = await Review.model.findByPk(reviewId);
      if (!review) {
        throw Boom.notFound("Review not found");
      }

      /*
				ReviewLikeDislike starts with the state at undefined, when the user likes the review it changes to TRUE and if the user dislikes it, it changes to FALSE.
			*/
      const customerLike = await ReviewLikeDislike.model.findOne({
        where: {
          reviewId,
          customerId,
        },
      });
      if (customerLike?.dataValues?.state) {
        await customerLike.destroy();
        await review.decrement("like");

        return res.status(200).json({
          message: "Review disliked",
        });
      } else if (customerLike?.dataValues?.state === false) {
        await customerLike.update({
          state: true,
        });
        await review.increment("like");
        await review.decrement("dislike");

        return res.status(200).json({
          message: "Review liked",
        });
      } else {
        await ReviewLikeDislike.model.create({
          state: true,
          customerId,
          reviewId,
        });
        await review.increment("like");

        return res.status(200).json({
          message: "Review liked",
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

// Dislike
router.patch(
  "/:id/dislike",
  JWT.verify,
  validatorSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: customerId } = req.auth;
    const { id: reviewId } = req.params;
    try {
      const review = await Review.model.findByPk(reviewId);
      if (!review) {
        throw Boom.notFound("Review not found");
      }

      const customerDislike = await ReviewLikeDislike.model.findOne({
        where: {
          reviewId,
          customerId,
        },
      });
      if (customerDislike?.dataValues?.state === false) {
        await customerDislike.destroy();
        await review.decrement("dislike");

        return res.status(200).json({
          message: "Review disliked",
        });
      } else if (customerDislike?.dataValues?.state) {
        await customerDislike.update({
          state: false,
        });
        await review.decrement("like");
        await review.increment("dislike");

        return res.status(200).json({
          message: "Review disliked",
        });
      } else {
        await ReviewLikeDislike.model.create({
          state: false,
          customerId,
          reviewId,
        });
        await review.increment("dislike");

        return res.status(200).json({
          message: "Review disliked",
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
