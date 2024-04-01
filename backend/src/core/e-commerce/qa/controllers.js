// eslint-disable-next-line no-unused-vars
const express = require("express");
const { Question, Answer, Product } = require("../../../database/mysql/models");
const { QueryBuilder } = require("../../../libs");
const { notFound } = require("../../../middlewares");

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
const findAllCustomer = async (req, res, next) => {
  const { userId } = req.auth;

  const { where, order, limit, offset } = new QueryBuilder(req.query)
    .where("customerId", userId)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const qa = await Question.model.findAndCountAll({
      where,
      include: [
        {
          model: Answer.model,
          as: "answer",
        },
        {
          model: Product.model,
          as: "product",
        },
      ],
      order,
      limit,
      offset,
    });

    res.json(qa);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findAllCustomerByProduct = async (req, res, next) => {
  const { userId } = req.auth;
  const { product } = req;

  const { where, order, limit, offset } = new QueryBuilder(req.query)
    .where("customerId", userId)
    .where("productId", product.id)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const qa = await Question.model.findAndCountAll({
      where,
      include: [
        {
          model: Answer.model,
          as: "answer",
        },
        {
          model: Product.model,
          as: "product",
        },
      ],
      order,
      limit,
      offset,
    });

    res.json(qa);
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
  const { userId } = req.auth;
  const { productId } = req.params;
  const { content } = req.body;

  try {
    const question = await Question.model.create({
      customerId: userId,
      productId,
      content,
    });

    res.status(201).json(question);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateProductId,
  findAllCustomer,
  findAllCustomerByProduct,
  create,
};
