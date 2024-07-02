const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../../db/mysql");
const QueryBuilder = require("../../../utils/query-builder");
const { NotFound } = require("../../../utils/http-errors");

const UserModel = sequelize.model("User");
const StoreModel = sequelize.model("Store");
const StoreGalleryModel = sequelize.model("StoreGallery");

const validateStoreId = async (req, _res, next, storeId) => {
  try {
    const store = await StoreModel.findByPk(storeId, {
      include: [
        {
          model: UserModel,
          as: "seller",
        },
      ],
    });
    if (!store) {
      throw new NotFound("Store not found");
    }
    const gallery = await StoreGalleryModel.findAll({ where: { storeId } });
    store.setDataValue("gallery", gallery);

    req.store = store;
    next();
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  const qb = new QueryBuilder(req.query)
    .whereLike("name", req.query.q)
    .orderBy("name", "ASC")
    .pagination()
    .build();

  try {
    const stores = await StoreModel.findAndCountAll({
      ...qb,
      include: {
        model: UserModel,
        as: "seller",
      },
    });

    res.json(stores);
  } catch (error) {
    next(error);
  }
};

const getCount = async (_req, res, next) => {
  try {
    const count = await StoreModel.count();

    res.json(count);
  } catch (error) {
    next(error);
  }
};

const getGrowthStats = async (req, res, next) => {
  const INTERVALS = ["7d", "30d", "3m", "6m", "1y", "all-time"];
  const DEFAULT_INTERVAL = "7d";

  const { interval } = req.query;
  const intervalToUse = INTERVALS.includes(interval)
    ? interval
    : DEFAULT_INTERVAL;

  try {
    switch (intervalToUse) {
      case "7d": {
        const stats = await StoreModel.findAll({
          attributes: [
            [
              Sequelize.fn(
                "date_format",
                Sequelize.col("createdAt"),
                "%Y-%m-%d",
              ),
              "date",
            ],
            [Sequelize.fn("count", Sequelize.col("id")), "count"],
          ],
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("CURRENT_DATE - INTERVAL 7 DAY"),
            },
          },
          group: ["date"],
          order: [["date", "ASC"]],
          raw: true,
        });

        res.json(stats);
        break;
      }
      case "30d": {
        const stats = await StoreModel.findAll({
          attributes: [
            [
              Sequelize.fn(
                "date_format",
                Sequelize.col("createdAt"),
                "%Y-%m-%d",
              ),
              "date",
            ],
            [Sequelize.fn("count", Sequelize.col("id")), "count"],
          ],
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("CURRENT_DATE - INTERVAL 30 DAY"),
            },
          },
          group: ["date"],
          order: [["date", "ASC"]],
          raw: true,
        });

        res.json(stats);
        break;
      }
      case "3m": {
        const stats = await StoreModel.findAll({
          attributes: [
            [
              Sequelize.fn(
                "date_format",
                Sequelize.col("createdAt"),
                "%Y-%m-%d",
              ),
              "date",
            ],
            [Sequelize.fn("count", Sequelize.col("id")), "count"],
          ],
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("CURRENT_DATE - INTERVAL 3 MONTH"),
            },
          },
          group: ["date"],
          order: [["date", "ASC"]],
          raw: true,
        });

        res.json(stats);
        break;
      }
      case "6m": {
        const stats = await StoreModel.findAll({
          attributes: [
            [
              Sequelize.fn(
                "date_format",
                Sequelize.col("createdAt"),
                "%Y-%m-%d",
              ),
              "date",
            ],
            [Sequelize.fn("count", Sequelize.col("id")), "count"],
          ],
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("CURRENT_DATE - INTERVAL 6 MONTH"),
            },
          },
          group: ["date"],
          order: [["date", "ASC"]],
          raw: true,
        });

        res.json(stats);
        break;
      }
      case "1y": {
        const stats = await StoreModel.findAll({
          attributes: [
            [
              Sequelize.fn(
                "date_format",
                Sequelize.col("createdAt"),
                "%Y-%m-%d",
              ),
              "date",
            ],
            [Sequelize.fn("count", Sequelize.col("id")), "count"],
          ],
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("CURRENT_DATE - INTERVAL 1 YEAR"),
            },
          },
          group: ["date"],
          order: [["date", "ASC"]],
          raw: true,
        });

        res.json(stats);
        break;
      }
      default: {
        const stats = await StoreModel.findAll({
          attributes: [
            [
              Sequelize.fn(
                "date_format",
                Sequelize.col("createdAt"),
                "%Y-%m-%d",
              ),
              "date",
            ],
            [Sequelize.fn("count", Sequelize.col("id")), "count"],
          ],
          group: ["date"],
          order: [["date", "ASC"]],
          raw: true,
        });

        res.json(stats);
      }
    }
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  const { store } = req;

  try {
    res.json(store);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateStoreId,
  findAll,
  getCount,
  getGrowthStats,
  findOne,
};
