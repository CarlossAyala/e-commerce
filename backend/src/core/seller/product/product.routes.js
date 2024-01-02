const express = require("express");
const { Sequelize, Op } = require("sequelize");
const Boom = require("@hapi/boom");
const schemas = require("./product.schema");
const { Category, Product, Store } = require("../../../database/mysql/models");
const { validateSchema, JWT } = require("../../../middlewares");
const { slugify, QueryBuilder } = require("../../../libs");
const router = express.Router();

// Get Products
router.get("/", JWT.verify, async (req, res, next) => {
  const { id: sellerId } = req.auth;
  try {
    const store = await Store.model.findOne({
      where: {
        sellerId,
      },
    });
    if (!store) return next(Boom.notFound("Store not found"));

    const qb = new QueryBuilder(req.query)
      .where("storeId", store.dataValues.id)
      .whereLike("name", req.query.name);

    switch (req.query.sortby) {
      case "latest":
        qb.orderBy("createdAt", "DESC");
        qb.orderBy("name", "DESC");
        break;

      default:
        qb.orderBy("name", "ASC");
    }
    const { where, order, limit, offset } = qb.pagination().build();

    const products = await Product.model.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// Get Products in Stock Alert
router.get("/stock-alert", JWT.verify, async (req, res, next) => {
  const { id: sellerId } = req.auth;
  try {
    const store = await Store.model.findOne({
      where: {
        sellerId,
      },
    });
    if (!store) return next(Boom.notFound("Store not found"));

    const { where, limit, offset } = new QueryBuilder(req.query)
      .where("storeId", store.dataValues.id)
      .whereLike("name", req.query.name)
      .pagination()
      .build();

    const products = await Product.model.findAndCountAll({
      where: {
        ...where,
        stock: {
          [Op.lte]: Sequelize.col("stock_alert"),
        },
      },
      order: [
        ["stock", "ASC"],
        ["name", "ASC"],
      ],
      limit,
      offset,
    });

    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// Get Product
router.get(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: sellerId } = req.auth;

    try {
      const store = await Store.model.findOne({
        where: {
          sellerId,
        },
      });
      if (!store) return next(Boom.notFound("Store not found"));

      const product = await Product.model.findOne({
        where: {
          id: req.params.id,
          storeId: store.dataValues.id,
        },
        include: {
          model: Category.model,
          as: "category",
        },
      });
      if (!product) return next(Boom.notFound("Product not found"));

      return res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

// New Product
router.post(
  "/",
  JWT.verify,
  validateSchema(schemas.base, "body"),
  async (req, res, next) => {
    const { id: sellerId } = req.auth;
    const { name, categoryId, ...rest } = req.body;

    try {
      const store = await Store.model.findOne({
        where: {
          sellerId,
        },
      });
      if (!store) return next(Boom.notFound("Store not found"));

      const category = await Category.model.findByPk(categoryId);
      if (!category) return next(Boom.notFound("Category not found"));

      /*
				TODO: Add Minimum and maximum charge amounts validations
				https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts
			*/

      const product = await Product.model.create({
        name,
        slug: slugify(name),
        categoryId,
        storeId: store.dataValues.id,
        ...rest,
      });

      return res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
);

// Update Product
router.put(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  validateSchema(schemas.base, "body"),
  async (req, res, next) => {
    const { id: sellerId } = req.auth;
    const { name, categoryId, ...rest } = req.body;

    try {
      const store = await Store.model.findOne({
        where: {
          sellerId,
        },
      });
      if (!store) return next(Boom.notFound("Store not found"));

      const category = await Category.model.findByPk(categoryId);
      if (!category) return next(Boom.notFound("Category not found"));

      const product = await Product.model.findOne({
        where: {
          id: req.params.id,
          storeId: store.dataValues.id,
        },
      });
      if (!product) return next(Boom.notFound("Product not found"));

      await product.update({
        name,
        slug: slugify(name),
        categoryId,
        ...rest,
      });

      return res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

// Delete Product
router.delete(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: productId } = req.params;
    const { id: sellerId } = req.auth;

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
          storeId: store.dataValues.id,
        },
      });
      if (!product) return next(Boom.notFound("Product not found"));

      await product.destroy();

      return res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
