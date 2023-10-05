const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const schemas = require("./category.schema");
const QueryBuilder = require("../../../utils/database/query-builder");
const { Category } = require("../../../database/mysql/models");
const { validateSchema } = require("../../../middlewares");

// Get Categories
router.get("/", async (req, res, next) => {
  const qb = new QueryBuilder(req.query)
    .whereLike("name", req.query.name)
    .orderBy("name", "ASC")
    .pagination()
    .build();

  try {
    const categories = await Category.model.findAndCountAll(qb);

    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

// Get Category
router.get(
  "/:id",
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    try {
      const category = await Category.model.findByPk(req.params.id);
      if (!category) return next(Boom.notFound("Category not found"));

      return res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
