// eslint-disable-next-line no-unused-vars
const express = require("express");
const { Product, Question, Answer } = require("../../../database/mysql/models");
const { notFound } = require("../../../middlewares");
const { QueryBuilder } = require("../../../libs");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} productId
 */
const validateProductId = async (req, _res, next, productId) => {
  try {
    const product = await Product.model.findByPk(productId);
    if (!product) throw notFound("Product not found");

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
const findAllProducts = async (req, res, next) => {
  const { productId } = req.params;

  const { where, order, limit, offset } = new QueryBuilder(req.query)
    .where("status", Question.enums.status.answered)
    .whereLike("content", req.query.q)
    .where("productId", productId)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const qa = await Question.model.findAndCountAll({
      where,
      include: {
        model: Answer.model,
        as: "answer",
      },
      order,
      limit,
      offset,
    });

    res.json(qa);
  } catch (error) {
    next(error);
  }
};

module.exports = { findAllProducts, validateProductId };
