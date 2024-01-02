const express = require("express");
const Boom = require("@hapi/boom");
const schemas = require("./category.schema");
const { validateSchema } = require("../../../middlewares/");
const { Category } = require("../../../database/mysql/models");
const { QueryBuilder } = require("../../../libs");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const qb = new QueryBuilder(req.query)
    .whereLike("name", req.query.q)
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

router.get(
  "/:id",
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: categoryId } = req.params;
    try {
      const category = await Category.model.findByPk(categoryId);
      if (!category) return next(Boom.notFound("Category not found"));

      return res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
