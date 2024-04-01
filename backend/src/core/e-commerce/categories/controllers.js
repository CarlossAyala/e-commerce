// eslint-disable-next-line no-unused-vars
const express = require("express");
const { Category, Product, Store } = require("../../../database/mysql/models");
const { notFound } = require("../../../middlewares");
const { Op, Sequelize } = require("sequelize");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} slug
 */
const validateCategorySlug = async (req, _res, next, slug) => {
  try {
    const category = await Category.model.findOne({
      where: {
        slug,
      },
      raw: true,
    });
    if (!category) throw notFound("Category not found");

    req.category = category;
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
const getAllMain = async (req, res, next) => {
  try {
    const categories = await Category.model.findAll({
      where: {
        type: Category.enums.type.main,
      },
      order: [["name", "ASC"]],
      raw: true,
    });

    res.json(categories);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAllFull = async (req, res, next) => {
  try {
    const categories = await Category.model.findAll({
      where: {
        type: Category.enums.type.main,
      },
      include: {
        model: Category.model,
        as: "children",
        separate: true,
        order: [["name", "ASC"]],
      },
      order: [["name", "ASC"]],
    });

    res.json(categories);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getCategoryBySlug = async (req, res, next) => {
  const { category } = req;

  try {
    res.json(category);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getCategoryListBySlug = async (req, res, next) => {
  const { category } = req;

  try {
    let _category;
    if (category.type === Category.enums.type.main) {
      _category = await Category.model.findOne({
        where: {
          id: category.id,
        },
        include: {
          model: Category.model,
          as: "children",
          separate: true,
          order: [["name", "ASC"]],
        },
      });
    } else {
      _category = await Category.model.findOne({
        where: {
          id: category.parentId,
        },
        include: {
          model: Category.model,
          as: "children",
          separate: true,
          order: [["name", "ASC"]],
        },
      });
    }

    res.json(_category);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getBestSeller = async (req, res, next) => {
  const { category } = req;

  try {
    const products = await Product.model.findAll({
      where: {
        categoryId: category.id,
        stock: {
          [Op.gt]: 0,
        },
        available: true,
      },
      order: [["sold", "DESC"]],
      limit: 10,
      offset: 0,
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getRandomProducts = async (req, res, next) => {
  const { category } = req;

  try {
    const products = await Product.model.findAll({
      where: {
        categoryId: category.id,
        stock: {
          [Op.gt]: 0,
        },
        available: true,
      },
      order: Sequelize.literal("RAND()"),
      limit: 10,
      offset: 0,
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getStores = async (req, res, next) => {
  const { category } = req;

  try {
    const stores = await Store.model.findAll({
      attributes: {
        exclude: ["userId"],
      },
      include: {
        model: Product.model,
        as: "products",
        where: {
          categoryId: category.id,
        },
        limit: 1,
        offset: 0,
        separate: true,
      },
      order: Sequelize.literal("RAND()"),
      limit: 10,
      offset: 0,
    });

    res.json(stores);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateCategorySlug,
  getAllMain,
  getAllFull,
  getCategoryBySlug,
  getCategoryListBySlug,
  getBestSeller,
  getRandomProducts,
  getStores,
};
