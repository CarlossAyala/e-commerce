const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const validatorSchema = require("../../../middlewares/api/validator.middleware");
const QueryBuilder = require("../../../utils/database/query-builder");
const schemas = require("./product.schema");
const { Product } = require("../../../database/mysql/models");
const { Op } = require("sequelize");

router.get("/", async (req, res, next) => {
  const qb = new QueryBuilder(req.query)
    .whereLike("name", req.query.q)
    .orderBy("name", "ASC")
    .pagination()
    .build();

  try {
    const products = await Product.model.findAndCountAll(qb);

    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: productId } = req.params;

    try {
      const product = await Product.model.findByPk(productId);

      if (!product) {
        return next(Boom.notFound("Product not found"));
      }

      return res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id/related",
  validatorSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: productId } = req.params;
    const { limit, offset } = new QueryBuilder(req.query).pagination().build();

    try {
      const product = await Product.model.findByPk(productId);
      if (!product) {
        return next(Boom.notFound("Product not found"));
      }

      const related = await Product.model.findAll({
        where: {
          [Op.or]: {
            categoryId: product.dataValues.categoryId,
            storeId: product.dataValues.storeId,
          },
          [Op.not]: {
            id: product.dataValues.id,
          },
        },
        limit,
        offset,
      });

      return res.status(200).json(related);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;