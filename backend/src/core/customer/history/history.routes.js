const express = require("express");
const { Op } = require("sequelize");
const schemas = require("./history.schema");
const { History, Product } = require("../../../database/mysql/models");
const { validateSchema } = require("../../../middlewares");
const { QueryBuilder } = require("../../../libs");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const { id: customerId } = req.auth;
  const { limit, offset } = new QueryBuilder(req.query).pagination().build();

  try {
    const history = await History.model.findAndCountAll({
      where: {
        customerId,
      },
      include: {
        model: Product.model,
        as: "product",
      },
      order: [["lastSeenAt", "DESC"]],
      limit,
      offset,
    });

    return res.status(200).json(history);
  } catch (error) {
    next(error);
  }
});

// TODO: Resolve problem with React useEffect fetch, double product register
router.post(
  "/:id",
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: customerId } = req.auth;
    const { id: productId } = req.params;
    console.log("\n HELL NO \n");

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

router.delete("/clear", async (req, res, next) => {
  const { id: customerId } = req.auth;

  try {
    await History.model.destroy({
      where: {
        customerId,
      },
    });

    return res.status(200).json({ message: "History cleared" });
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:id",
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    try {
      const { id: customerId } = req.auth;
      const { id: productId } = req.params;

      const history = await History.model.findOne({
        where: {
          productId,
          customerId,
        },
      });

      await history.destroy();

      return res.status(200).json({ message: "History removed" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
