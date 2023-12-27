const express = require("express");
const router = express.Router();
const { JWT, authentication } = require("../../../middlewares");
const { Store, User, Order } = require("../../../database/mysql/models");
const { Op } = require("sequelize");

const RANGE_DEFAULT = "7d";
const RANGE_LIST = {
  "7d": 7 * 60 * 60 * 24 * 1000,
  "1m": 30 * 60 * 60 * 24 * 1000,
  "3m": 90 * 60 * 60 * 24 * 1000,
  "6m": 180 * 60 * 60 * 24 * 1000,
  "1y": 365 * 60 * 60 * 24 * 1000,
};

// TODO: Add authorization

// TODO: Add logic for "all" range
router.get(
  "/customers-stores",
  JWT.verify,
  authentication,
  async (req, res, next) => {
    const { range } = req.query;
    const stats = new Map();

    const rangeValue = RANGE_LIST[range] ?? RANGE_LIST[RANGE_DEFAULT];
    const isAllRange = range === "all";

    const TODAY = new Date();
    const startRange = new Date(TODAY.getTime() - rangeValue);
    startRange.setHours(0, 0, 0, 0);
    startRange.setDate(startRange.getDate() + 1);
    const tempStartRange = new Date(startRange);

    const ONE_DAY = 60 * 60 * 24 * 1000;
    while (tempStartRange.getTime() <= TODAY.getTime()) {
      stats.set(tempStartRange.toLocaleDateString(), {
        customers: 0,
        stores: 0,
        date: tempStartRange.toISOString(),
      });

      tempStartRange.setTime(tempStartRange.getTime() + ONE_DAY);
    }

    try {
      const stores = await Store.model.findAll({
        where: {
          ...(!isAllRange && {
            createdAt: {
              [Op.gte]: startRange,
            },
          }),
        },
      });
      const customers = await User.model.findAll({
        where: {
          ...(!isAllRange && {
            createdAt: {
              [Op.gte]: startRange,
            },
          }),
        },
      });

      for (const store of stores) {
        const date = new Date(store.createdAt);
        const dateString = date.toLocaleDateString();
        const currentStats = stats.get(dateString);
        stats.set(dateString, {
          ...currentStats,
          stores: currentStats.stores + 1,
        });
      }

      for (const customer of customers) {
        const date = new Date(customer.createdAt);
        const dateKey = date.toLocaleDateString();
        const stat = stats.get(dateKey);
        stats.set(dateKey, {
          ...stat,
          customers: stat.customers + 1,
        });
      }

      return res.json(Array.from(stats.values()));
    } catch (error) {
      next(error);
    }
  }
);

router.get("/customers", JWT.verify, authentication, async (req, res, next) => {
  try {
    const { count } = await User.model.findAndCountAll();

    return res.json({
      count,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/stores", JWT.verify, authentication, async (req, res, next) => {
  try {
    const { count } = await Store.model.findAndCountAll();

    return res.json({
      count,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/orders", JWT.verify, authentication, async (req, res, next) => {
  // Get total of the current month
  const currentMonth = new Date();
  currentMonth.setDate(1);
  currentMonth.setHours(0, 0, 0, 0);
  try {
    const { count } = await Order.model.findAndCountAll({
      where: {
        orderedAt: {
          [Op.gte]: currentMonth,
        },
      },
    });

    return res.json({
      count,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/revenues", JWT.verify, authentication, async (req, res, next) => {
  // Get total of the current month
  const currentMonth = new Date();
  currentMonth.setDate(1);
  currentMonth.setHours(0, 0, 0, 0);

  try {
    const revenue = await Order.model.sum("total", {
      where: {
        orderedAt: {
          [Op.gte]: currentMonth,
        },
      },
    });

    // revenue may be null
    return res.json({
      revenue: revenue || 0,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
