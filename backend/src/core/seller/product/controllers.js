// eslint-disable-next-line no-unused-vars
const express = require("express");
const { Sequelize, Op } = require("sequelize");
const { QueryBuilder, slugify } = require("../../../libs");
const { Product, Category } = require("../../../database/mysql/models");
const { notFound } = require("../../../middlewares");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} productId
 */
const findById = async (req, _res, next, productId) => {
  const { store } = req;

  try {
    const product = await Product.model.findByPk(productId);

    if (!product || product.storeId !== store.id) {
      throw notFound("Product not found");
    }

    req.product = product;
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
  const { store } = req;
  const qb = new QueryBuilder(req.query)
    .where("storeId", store.id)
    .whereLike("name", req.query.q)
    .pagination()
    .build();

  try {
    const result = await Product.model.findAndCountAll(qb);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const stockAlert = async (req, res, next) => {
  const { store } = req;

  const { where, limit, offset } = new QueryBuilder(req.query)
    .where("storeId", store.id)
    .whereLike("name", req.query.q)
    .pagination()
    .build();

  try {
    const products = await Product.model.findAndCountAll({
      where: {
        ...where,
        stock: {
          [Op.lte]: Sequelize.col("stock_alert"),
        },
      },
      order: [["name", "ASC"]],
      limit,
      offset,
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
const findOne = async (req, res, next) => {
  const { product } = req;

  try {
    res.json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const create = async (req, res, next) => {
  const { store } = req;
  const { name, categoryId, ...rest } = req.body;

  try {
    const category = await Category.model.findByPk(categoryId);
    if (!category) throw notFound("Category not found");

    const product = await Product.model.create({
      name,
      slug: slugify(name),
      categoryId,
      storeId: store.id,
      ...rest,
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const update = async (req, res, next) => {
  const { product } = req;
  const { name, categoryId, ...rest } = req.body;

  try {
    const category = await Category.model.findByPk(categoryId);
    if (!category) throw notFound("Category not found");

    await product.update({
      name,
      slug: slugify(name),
      categoryId,
      ...rest,
    });

    res.json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const updateStockAlert = async (req, res, next) => {
  const { product } = req;
  const { stock, stockAlert } = req.body;

  try {
    await product.update({
      stock,
      stockAlert,
    });

    res.json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const remove = async (req, res, next) => {
  const { product } = req;

  try {
    await product.destroy();

    res.json({
      message: "Product deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findById,
  findAll,
  stockAlert,
  findOne,
  create,
  update,
  updateStockAlert,
  remove,
};
