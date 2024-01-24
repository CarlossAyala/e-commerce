const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const { Product, Review, User } = require("../../../database/mysql/models");
const { validateSchema, JWT } = require("../../../middlewares");
const schemas = require("./review.schema");
const sequelize = require("../../../database/mysql");
const { QueryBuilder } = require("../../../libs");

router.get("/customer", JWT.verify, async (req, res, next) => {
  const { id: customerId } = req.auth;

  const qb = new QueryBuilder(req.query).where("customerId", customerId);

  switch (req.query.status) {
    case "pending": {
      qb.where("status", Review.enums.status.pending).orderBy(
        "createdAt",
        "DESC"
      );
      break;
    }
    default: {
      qb.where("status", Review.enums.status.done).orderBy("updatedAt", "DESC");
      break;
    }
  }

  try {
    const customer = await User.model.findByPk(customerId);
    if (!customer) {
      throw Boom.notFound("Customer not found");
    }

    const { where, order, limit, offset } = qb.pagination().build();

    const reviews = await Review.model.findAndCountAll({
      where,
      include: {
        model: Product.model,
        as: "product",
      },
      order,
      limit,
      offset,
    });

    return res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    const { id: customerId } = req.auth;

    const validStatus = Object.values(Review.enums.status).includes(status);
    const status = validStatus ? status : Review.enums.status.done;

    try {
      const review = await Review.model.findOne({
        where: {
          id,
          customerId,
          status,
        },
        include: {
          model: Product.model,
          as: "product",
        },
      });
      if (!review) throw Boom.notFound("Review not found");

      return res.json(review);
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
    const qb = new QueryBuilder(req.query)
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
        attributes: {
          exclude: ["customerId"],
        },
        ...qb,
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
          [sequelize.fn("COUNT", sequelize.col("id")), "count"],
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

      console.log("REVIEWS", reviews);

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

router.post(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  validateSchema(schemas.base, "body"),
  async (req, res, next) => {
    const { id: customerId } = req.auth;
    const { id: reviewId } = req.params;
    const { rating, description } = req.body;

    try {
      const review = await Review.model.findByPk(reviewId);
      if (review.dataValues.customerId !== customerId) {
        return next(Boom.forbidden("You can't edit this review"));
      } else if (review.dataValues.status === Review.enums.status.done) {
        return next(Boom.conflict("Review already exists"));
      } else if (!review) {
        return next(Boom.notFound("Review not found"));
      }

      await review.update({
        rating,
        description,
        status: Review.enums.status.done,
      });

      return res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
