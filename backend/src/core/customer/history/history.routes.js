const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const { Op } = require("sequelize");
const { History, Product } = require("../../../database/mysql/models");
const { validateSchema, JWT } = require("../../../middlewares");
const schemas = require("./history.schema");

// TODO: Add pagination

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

// TODO: Resolve problem with React useEffect fetch, double product register
router.post(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: customerId } = req.auth;
    const { id: productId } = req.params;

    try {
      const currentMonth = new Date();
      currentMonth.setHours(0, 0, 0, 0);
      currentMonth.setDate(1);

      const history = await History.model.findOne({
        where: {
          customerId,
          productId,
          lastSeenAt: {
            [Op.gte]: currentMonth,
          },
        },
      });

      if (!history) {
        await History.model.create({
          customerId,
          productId,
        });
      } else {
        await history.update({ lastSeenAt: new Date() });
      }

      return res.json(history);
    } catch (error) {
      next(error);
    }
  }
);

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

router.delete(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
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
