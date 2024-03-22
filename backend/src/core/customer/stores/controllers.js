// eslint-disable-next-line no-unused-vars
const express = require("express");
const { QueryBuilder } = require("../../../libs");
const { notFound } = require("../../../middlewares");
const { Store, Product } = require("../../../database/mysql/models");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findAll = async (req, res, next) => {
  const qb = new QueryBuilder(req.query)
    .whereLike("name", req.query.q)
    .pagination()
    .build();

  try {
    const stores = await Store.model.findAndCountAll(qb);

    res.json(stores);
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
  const { storeId } = req.params;

  try {
    const store = await Store.model.findByPk(storeId);
    if (!store) {
      throw notFound("Store not found");
    }

    res.json(store);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findByProductId = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await Product.model.findByPk(productId);
    if (!product) {
      throw notFound("Product not found");
    }

    const store = await Store.model.findByPk(product.dataValues.storeId);
    if (!store) {
      throw notFound("Store not found");
    }

    res.json(store);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findProducts = async (req, res, next) => {
  const { storeId } = req.params;

  const qb = new QueryBuilder(req.query)
    .where("storeId", storeId)
    .whereLike("name", req.query.q)
    .pagination()
    .build();

  try {
    const store = await Store.model.findByPk(storeId);
    if (!store) {
      throw notFound("Store not found");
    }

    const products = await Product.model.findAndCountAll(qb);

    res.json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findOne,
  findByProductId,
  findProducts,
};
