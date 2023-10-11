const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const {
  Product,
  Review,
  ReviewLikeDislike,
  User,
} = require("../../../database/mysql/models");
const { validateSchema, JWT } = require("../../../middlewares");
const schemas = require("./review.schema");
const sequelize = require("../../../database/mysql");
const QueryBuilder = require("../../../utils/database/query-builder");

router.get("/customer", JWT.verify, async (req, res, next) => {
  const { id: customerId } = req.auth;

  const qb = new QueryBuilder(req.query).where("customerId", customerId);

  switch (req.query.status) {
    case "done": {
      qb.where("status", Review.enums.status.done).orderBy("updatedAt", "DESC");
      break;
    }
    case "pending": {
      qb.where("status", Review.enums.status.pending).orderBy(
        "createdAt",
        "DESC"
      );
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

    return res.status(200).json(reviews);
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

    let status;
    switch (req.query.status) {
      case "done": {
        status = Review.enums.status.done;
        break;
      }
      case "pending": {
        status = Review.enums.status.pending;
        break;
      }
    }

    try {
      const review = await Review.model.findOne({
        where: {
          id,
          customerId,
        },
        include: {
          model: Product.model,
          as: "product",
        },
      });
      if (!review) {
        throw Boom.notFound("Review not found");
      } else if (status === "done" && review.dataValues.status === "done") {
        throw Boom.badRequest("Review is already done");
      }

      return res.status(200).json(review);
    } catch (error) {
      next(error);
    }
  }
);

// TODO: Delete this
router.get("/customer/done", JWT.verify, async (req, res, next) => {
  const { id: customerId } = req.auth;

  const { where, limit, offset, order } = new QueryBuilder(req.query)
    .where("status", Review.enums.status.done)
    .where("customerId", customerId)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const reviews = await Review.model.findAndCountAll({
      where,
      order,
      include: {
        model: Product.model,
        as: "product",
      },
      limit,
      offset,
    });

    return res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

// TODO: Delete this
router.get("/customer/pending", JWT.verify, async (req, res, next) => {
  const { id: customerId } = req.auth;

  const { where, limit, offset, order } = new QueryBuilder(req.query)
    .where("status", Review.enums.status.pending)
    .where("customerId", customerId)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const reviews = await Review.model.findAndCountAll({
      where,
      order,
      include: {
        model: Product.model,
        as: "product",
      },
      limit,
      offset,
    });

    return res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

// Get Reviews
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

// Get Stats
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
      let avarageRating = 0;
      for (const review of reviews) {
        const { rating, count } = review.dataValues;
        totalReviews += count;
        avarageRating += rating * count;
      }
      if (avarageRating !== 0) {
        avarageRating = Number(avarageRating / totalReviews).toFixed(2);
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
        avarage: avarageRating,
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

// Like Review
router.post(
  "/:id/like",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: customerId } = req.auth;
    const { id: reviewId } = req.params;
    try {
      const review = await Review.model.findByPk(reviewId);
      if (!review) {
        throw Boom.notFound("Review not found");
      }

      // Si ya le dio like, lo elimina
      const likeState = await ReviewLikeDislike.model.findOne({
        where: {
          reviewId,
          customerId,
        },
      });
      if (likeState?.dataValues?.state) {
        await likeState.destroy();
        await review.decrement("like");

        return res.status(200).json({
          message: "Review disliked",
        });
      } else if (likeState?.dataValues?.state === false) {
        await likeState.update({
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

// Dislike Review
router.post(
  "/:id/dislike",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: customerId } = req.auth;
    const { id: reviewId } = req.params;
    try {
      const review = await Review.model.findByPk(reviewId);
      if (!review) {
        throw Boom.notFound("Review not found");
      }

      // Si ya le dio dislike, lo elimina
      const dislikeState = await ReviewLikeDislike.model.findOne({
        where: {
          reviewId,
          customerId,
        },
      });
      if (dislikeState?.dataValues?.state === false) {
        await dislikeState.destroy();
        await review.decrement("dislike");

        return res.status(200).json({
          message: "Review disliked",
        });
      } else if (dislikeState?.dataValues?.state) {
        await dislikeState.update({
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
