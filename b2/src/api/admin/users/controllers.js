const { Op, Sequelize } = require("sequelize");
const db = require("../../../db/mysql/models");

const UserModel = db.sequelize.model("User");

const getCount = async (_req, res, next) => {
  try {
    const count = await UserModel.count();

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
        const stats = await UserModel.findAll({
          attributes: [
            [
              Sequelize.fn(
                "date_format",
                Sequelize.col("created_at"),
                "%Y-%m-%d"
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
        const stats = await UserModel.findAll({
          attributes: [
            [
              Sequelize.fn(
                "date_format",
                Sequelize.col("created_at"),
                "%Y-%m-%d"
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
        const stats = await UserModel.findAll({
          attributes: [
            [
              Sequelize.fn(
                "date_format",
                Sequelize.col("created_at"),
                "%Y-%m-%d"
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
        const stats = await UserModel.findAll({
          attributes: [
            [
              Sequelize.fn(
                "date_format",
                Sequelize.col("created_at"),
                "%Y-%m-%d"
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
        const stats = await UserModel.findAll({
          attributes: [
            [
              Sequelize.fn(
                "date_format",
                Sequelize.col("created_at"),
                "%Y-%m-%d"
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
        const stats = await UserModel.findAll({
          attributes: [
            [
              Sequelize.fn(
                "date_format",
                Sequelize.col("created_at"),
                "%Y-%m-%d"
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

module.exports = { getCount, getGrowthStats };
