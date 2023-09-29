const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const validatorSchema = require("../../../middlewares/api/validator.middleware");
const QueryBuilder = require("../../../utils/database/query-builder");
const schemas = require("./review.schema");
const { Product, Review } = require("../../../database/mysql/models");
const { Sequelize } = require("sequelize");

router.get(
  "/:id/stats",
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
          [Sequelize.fn("AVG", Sequelize.col("rating")), "average"],
        ],
        where: {
          productId,
          status: Review.enums.status.done,
        },
        group: ["rating"],
        order: [["rating", "DESC"]],
      });

      return res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
