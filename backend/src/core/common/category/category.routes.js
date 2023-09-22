const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const validatorSchema = require("../../../middlewares/api/validator.middleware");
const schemas = require("./category.schema");
const { Category } = require("../../../database/mysql/models");
const QueryBuilder = require("../../../utils/database/query-builder");

router.get("/", async (req, res, next) => {
  console.log("----------------", req.query);
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
  validatorSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const category = await Category.model.findByPk(id);
      if (!category) return next(Boom.notFound("Category not found"));

      return res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
