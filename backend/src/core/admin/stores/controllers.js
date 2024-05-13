// eslint-disable-next-line no-unused-vars
import express from "express";
import { Sequelize, Op } from "sequelize";
import { QueryBuilder } from "../../../libs/index.js";
import {
  Store,
  User,
  StoreImage,
} from "../../../database/mysql/models/index.js";
import { notFound } from "../../../middlewares/index.js";

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} storeId
 */
const validateStoreId = async (req, _res, next, storeId) => {
  try {
    const store = await Store.model.findByPk(storeId, {
      include: [
        {
          model: User.model,
          as: "seller",
        },
      ],
    });
    if (!store) {
      throw notFound("Store not found");
    }
    const gallery = await StoreImage.model.findAll({ where: { storeId } });
    store.setDataValue("gallery", gallery);

    req.store = store;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findAll = async (req, res, next) => {
  const qb = new QueryBuilder(req.query)
    .whereLike("name", req.query.q)
    .orderBy("name", "ASC")
    .pagination()
    .build();

  try {
    const stores = await Store.model.findAndCountAll({
      ...qb,
      include: {
        model: User.model,
        as: "seller",
      },
    });

    res.json(stores);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} _req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getCount = async (_req, res, next) => {
  try {
    const count = await Store.model.count();

    res.json(count);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
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
        const stats = await Store.model.findAll({
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
        const stats = await Store.model.findAll({
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
        const stats = await Store.model.findAll({
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
        const stats = await Store.model.findAll({
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
        const stats = await Store.model.findAll({
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
        const stats = await Store.model.findAll({
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

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findOne = async (req, res, next) => {
  const { store } = req;

  try {
    res.json(store);
  } catch (error) {
    next(error);
  }
};

export default {
  validateStoreId,
  findAll,
  getCount,
  getGrowthStats,
  findOne,
};
