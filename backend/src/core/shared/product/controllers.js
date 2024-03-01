// eslint-disable-next-line no-unused-vars
const express = require("express");
const { Op } = require("sequelize");
const { QueryBuilder } = require("../../../libs");
const { Product } = require("../../../database/mysql/models");
const { notFound } = require("../../../middlewares");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} productId
 */
const findById = async (req, _res, next, productId) => {
  try {
    const product = await Product.model.findByPk(productId);
    if (!product) {
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
const findAll = async (req, res, next) => {
  const qb = new QueryBuilder(req.query)
    .whereLike("name", req.query.q)
    .orderBy("name", "ASC")
    .pagination()
    .build();

  try {
    const products = await Product.model.findAndCountAll(qb);

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
const findRelated = async (req, res, next) => {
  const { product } = req;
  const { storeId, categoryId } = product;

  const { limit, offset } = new QueryBuilder(req.query).pagination().build();

  try {
    const related = await Product.model.findAndCountAll({
      where: {
        [Op.or]: {
          categoryId,
          storeId,
        },
        [Op.not]: {
          id: product.id,
        },
      },
      limit,
      offset,
    });

    res.json(related);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findOne,
  findAll,
  findRelated,
  findById,
};
