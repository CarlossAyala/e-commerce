const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const slugify = require("slugify");
const { Category, Product, Store } = require("../../../database/mysql/models");
const validatorSchema = require("../../../middlewares/api/validator.middleware");
const JWT = require("../../../middlewares/auth/jwt.auth");
const schemas = require("./product.schema");
const slugifyOptions = require("../../../constant/slugify");
const QueryBuilder = require("../../../utils/database/query-builder");

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

    const { where, order, limit, offset } = new QueryBuilder(req.query)
      .where("storeId", store.dataValues.id)
      .whereLike("name", req.query.name)
      .orderBy("name", "ASC")
      .pagination()
      .build();

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

// Get Product
router.get(
  "/:id",
  JWT.verify,
  validatorSchema(schemas.resourceId, "params"),
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
  validatorSchema(schemas.base, "body"),
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

      const product = await Product.model.create({
        name,
        slug: slugify(name, slugifyOptions),
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
  validatorSchema(schemas.resourceId, "params"),
  validatorSchema(schemas.base, "body"),
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
        slug: slugify(name, slugifyOptions),
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
  validatorSchema(schemas.resourceId, "params"),
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
