const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const slugify = require("slugify");
const {
  Store,
  OrderItem,
  Product,
  Question,
} = require("../../../database/mysql/models");
const validatorSchema = require("../../../middlewares/api/validator.middleware");
const JWT = require("../../../middlewares/auth/jwt.auth");
const schema = require("./store.schema");
const slugifyOptions = require("../../../constant/slugify");
const { Op, Sequelize } = require("sequelize");
const ms = require("ms");

// Get Store
router.get("/", JWT.verify, async (req, res, next) => {
  const { id: sellerId } = req.auth;

  try {
    const store = await Store.model.findOne({
      where: {
        sellerId,
      },
    });

    console.log("Store", store);

    return res.status(200).json(store);
  } catch (error) {
    next(error);
  }
});

// Get Store Stats
router.get("/stats", JWT.verify, async (req, res, next) => {
  const { id: sellerId } = req.auth;

  try {
    const store = await Store.model.findOne({
      where: {
        sellerId,
      },
    });
    if (!store) return next(Boom.notFound("Store not found"));

    const daysAgo30 = new Date(Date.now() - ms("30d"));

    const revenuesPromise = OrderItem.model.findAll({
      attributes: [
        "id",
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal("OrderItem.price * OrderItem.quantity")
          ),
          "revenue",
        ],
      ],
      where: {
        createdAt: {
          [Op.gte]: daysAgo30,
        },
      },
      include: {
        model: Product.model,
        as: "product",
        attributes: [],
        where: {
          storeId: store.id,
        },
      },
      group: ["id"],
    });

    const soldPromise = OrderItem.model.findAll({
      attributes: ["quantity"],
      where: {
        createdAt: {
          [Op.gte]: daysAgo30,
        },
      },
      include: {
        model: Product.model,
        as: "product",
        attributes: [],
        where: {
          storeId: store.id,
        },
      },
    });

    const stockAlertPromise = Product.model.count({
      where: {
        storeId: store.id,
        stock: {
          [Op.lte]: Sequelize.col("stock_alert"),
        },
      },
    });

    const questionsPromise = Question.model.count({
      where: {
        states: Question.enums.states.queue,
      },
      include: {
        model: Product.model,
        as: "product",
        attributes: [],
        where: {
          storeId: store.id,
        },
      },
    });

    const [revenuesResult, soldResult, stockAlertResult, questionsResult] =
      await Promise.all([
        revenuesPromise,
        soldPromise,
        stockAlertPromise,
        questionsPromise,
      ]);

    const revenue = revenuesResult.reduce(
      (acc, item) => acc + (+item.dataValues.revenue || 0),
      0
    );
    const sold = soldResult.reduce(
      (acc, item) => acc + (+item.dataValues.quantity || 0),
      0
    );

    return res.status(200).json({
      revenue,
      sold,
      stockAlert: stockAlertResult,
      questions: questionsResult,
    });
  } catch (error) {
    next(error);
  }
});

// Create Store
router.post(
  "/",
  JWT.verify,
  validatorSchema(schema.base, "body"),
  async (req, res, next) => {
    const { id: sellerId } = req.auth;
    const { name, description } = req.body;
    const slug = slugify(name, slugifyOptions);

    try {
      const store = await Store.model.findOne({
        where: {
          [Op.or]: [{ name }, { sellerId }, { slug }],
        },
      });
      if (store?.sellerId === sellerId) {
        return next(Boom.badRequest("You already have a Store"));
      } else if (store?.name === name || store?.slug === slug) {
        return next(Boom.badRequest("Store already exists"));
      }

      const newStore = await Store.model.create({
        name,
        description,
        sellerId,
        slug,
      });

      return res.status(201).json(newStore);
    } catch (error) {
      next(error);
    }
  }
);

// Change Name
router.patch(
  "/change-name",
  JWT.verify,
  validatorSchema(schema.changeName, "body"),
  async (req, res, next) => {
    const { id: sellerId } = req.auth;
    const { name } = req.body;
    const slug = slugify(name, slugifyOptions);

    try {
      const store = await Store.model.findOne({
        where: {
          [Op.or]: [{ name }, { sellerId }, { slug }],
        },
      });
      if (!store || store?.sellerId !== sellerId) {
        return next(Boom.badRequest("Store not found"));
      } else if (store?.name === name || store?.slug === slug) {
        return next(Boom.badRequest("The Store name already exists"));
      }

      await store.update({
        name,
        slug,
      });

      return res.status(200).json(store);
    } catch (error) {
      next(error);
    }
  }
);

// Change description
router.patch(
  "/change-description",
  JWT.verify,
  validatorSchema(schema.changeDescription, "body"),
  async (req, res, next) => {
    const { id: sellerId } = req.auth;
    const { description } = req.body;

    try {
      const store = await Store.model.findOne({
        where: {
          sellerId,
        },
      });
      if (!store) return next(Boom.badRequest("Store not found"));

      await store.update({
        description,
      });

      return res.status(200).json(store);
    } catch (error) {
      next(error);
    }
  }
);

// Delete Store
router.delete("/", JWT.verify, async (req, res, next) => {
  const { id: sellerId } = req.auth;
  try {
    const store = await Store.model.findOne({
      where: {
        sellerId,
      },
    });
    if (!store) return next(Boom.badRequest("Store not found"));

    await store.destroy();

    return res.status(200).json({
      message: "Store deleted",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
