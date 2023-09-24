const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const { Store, Review, Product } = require("../../../database/mysql/models");
const JWT = require("../../../middlewares/auth/jwt.auth");
const validatorSchema = require("../../../middlewares/api/validator.middleware");
const schemas = require("./review.schema");
const QueryBuilder = require("../../../utils/database/query-builder");
const { Sequelize } = require("sequelize");

// Overview
router.get("/overview", JWT.verify, async (req, res, next) => {
  const { id: sellerId } = req.auth;
  const { limit, offset } = new QueryBuilder(req.query).pagination().build();

  try {
    const store = await Store.model.findOne({
      where: {
        sellerId,
      },
    });
    if (!store) return next(Boom.notFound("Store not found"));

    const reviews = await Review.model.findAndCountAll({
      attributes: [
        "productId",
        [Sequelize.fn("AVG", Sequelize.col("rating")), "rating"],
        [Sequelize.fn("COUNT", Sequelize.col("product_id")), "count"],
      ],
      where: {
        status: Review.enums.status.done,
      },
      include: {
        model: Product.model,
        as: "product",
        where: {
          storeId: store.id,
        },
      },
      group: "product_id",
      order: [
        ["count", "DESC"],
        ["rating", "DESC"],
        [{ model: Product.model, as: "product" }, "name", "ASC"],
      ],
      limit,
      offset,
    });

    reviews.count = reviews.count.length;

    return res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

// Timeline
router.get("/timeline", JWT.verify, async (req, res, next) => {
  const { id: sellerId } = req.auth;
  const { order, limit, offset } = new QueryBuilder(req.query)
    .orderBy("updatedAt", "DESC")
    .pagination()
    .build();

  try {
    const store = await Store.model.findOne({
      where: {
        sellerId,
      },
    });
    if (!store) return next(Boom.notFound("Store not found"));

    const reviews = await Review.model.findAndCountAll({
      where: {
        status: Review.enums.status.done,
      },
      include: {
        model: Product.model,
        as: "product",
        where: {
          storeId: store.id,
        },
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

// Get review
router.get(
  "/:id",
  JWT.verify,
  validatorSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: sellerId } = req.auth;
    const { id: reviewId } = req.params;

    try {
      const store = await Store.model.findOne({
        where: {
          sellerId,
        },
      });
      if (!store) return next(Boom.notFound("Store not found"));

      const review = await Review.model.findOne({
        where: {
          id: reviewId,
        },
        include: {
          model: Product.model,
          as: "product",
          where: {
            storeId: store.dataValues.id,
          },
        },
      });

      if (!review) return next(Boom.notFound("Review not found"));

      return res.status(200).json(review);
    } catch (error) {
      next(error);
    }
  }
);

// Product Reviews
router.get(
  "/product/:id",
  JWT.verify,
  validatorSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: sellerId } = req.auth;
    const { id: productId } = req.params;
    const { order, limit, offset } = new QueryBuilder(req.query)
      .orderBy("updatedAt", "DESC")
      .pagination()
      .build();

    try {
      const store = await Store.model.findOne({
        where: {
          sellerId,
        },
      });
      if (!store) return next(Boom.notFound("Store not found"));

      const product = await Product.model.findOne({
        where: {
          id: productId,
          storeId: store.id,
        },
      });
      if (!product) return next(Boom.notFound("Product not found"));

      const reviews = await Review.model.findAndCountAll({
        where: {
          status: Review.enums.status.done,
          productId,
        },
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

// Product Score Review
router.get(
  "/product/:id/score",
  JWT.verify,
  validatorSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: sellerId } = req.auth;
    const { id: productId } = req.params;

    try {
      const store = await Store.model.findOne({
        where: {
          sellerId,
        },
      });
      if (!store) return next(Boom.notFound("Store not found"));

      const product = await Product.model.findOne({
        where: {
          id: productId,
          storeId: store.id,
        },
      });
      if (!product) return next(Boom.notFound("Product not found"));

      const [{ rating }] = await Review.model.findAll({
        attributes: [
          "productId",
          [Sequelize.fn("AVG", Sequelize.col("rating")), "rating"],
        ],
        where: {
          status: Review.enums.status.done,
          productId,
        },
      });

      return res.status(200).json(rating || 0);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
