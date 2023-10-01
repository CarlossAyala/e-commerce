const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const { Op } = require("sequelize");
const { History, Product } = require("../../../database/mysql/models");
const JWT = require("../../../middlewares/auth/jwt.auth");
const validatorSchema = require("../../../middlewares/api/validator.middleware");
const schemas = require("./history.schema");

// TODO: Add pagination

// Get All
router.get("/", JWT.verify, async (req, res, next) => {
  try {
    const history = await History.model.findAndCountAll({
      where: {
        customerId: req.auth.id,
      },
      include: {
        model: Product.model,
        as: "product",
      },
      order: [["lastSeenAt", "DESC"]],
    });

    return res.status(200).json(history);
  } catch (error) {
    next(error);
  }
});

// Add
router.post(
  "/:id",
  JWT.verify,
  validatorSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    try {
      const { id: productId } = req.params;

      const product = await Product.model.findByPk(productId);
      if (!product) return next(Boom.notFound("Product not found"));

      const date = new Date();
      const startDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endDayOfMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      );

      // console.log('startDayOfMonth', startDayOfMonth);
      // console.log('endDayOfMonth', endDayOfMonth);

      const [history, created] = await History.model.findOrCreate({
        where: {
          customerId: req.auth.id,
          productId,
          lastSeenAt: {
            [Op.between]: [startDayOfMonth, endDayOfMonth],
          },
        },
        defaults: {
          customerId: req.auth.id,
          productId,
          lastSeenAt: new Date(),
        },
      });

      return res.status(created ? 201 : 200).json(history);
    } catch (error) {
      next(error);
    }
  }
);

// Clear
router.delete("/clear", JWT.verify, async (req, res, next) => {
  try {
    await History.model.destroy({
      where: {
        customerId: req.auth.id,
      },
    });

    return res.status(200).json({ message: "History cleared" });
  } catch (error) {
    next(error);
  }
});

// Remove
router.delete(
  "/:id",
  JWT.verify,
  validatorSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const history = await History.model.findOne({
        where: {
          id,
          customerId: req.auth.id,
        },
      });
      if (!history) return next(Boom.notFound("History not found"));

      await history.destroy();

      return res.status(200).json({ message: "History removed" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
