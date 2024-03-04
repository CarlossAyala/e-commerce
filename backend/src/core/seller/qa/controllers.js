// eslint-disable-next-line no-unused-vars
const express = require("express");
const { Question, Product, Answer } = require("../../../database/mysql/models");
const { QueryBuilder } = require("../../../libs");
const { notFound, badRequest } = require("../../../middlewares");
const sequelize = require("../../../database/mysql/connection");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} questionId
 */
const validateQuestionId = async (req, _res, next, questionId) => {
  const { store } = req;

  try {
    const question = await Question.model.findOne({
      where: {
        id: questionId,
      },
      include: {
        model: Product.model,
        as: "product",
        where: {
          storeId: store.id,
        },
      },
    });
    if (!question) throw notFound("Question not found");

    req.question = question;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} productId
 */
const validateProductId = async (req, _res, next, productId) => {
  const { store } = req;

  try {
    const product = await Product.model.findOne({
      where: {
        id: productId,
        storeId: store.id,
      },
    });
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
const findAll = async (req, res, next) => {
  const { store } = req;

  let { status } = req.query;
  if (status && !Array.isArray(status)) {
    status = [status];
  }
  const { where: whereQA } = new QueryBuilder(req.query)
    .whereIn("status", status)
    .build();

  const {
    where: whereProduct,
    order,
    limit,
    offset,
  } = new QueryBuilder(req.query)
    .where("storeId", store.id)
    .whereLike("name", req.query.q)
    .orderBy("name", "ASC")
    .pagination()
    .build();

  try {
    const products = await Product.model.findAndCountAll({
      where: whereProduct,
      include: {
        model: Question.model,
        as: "questions",
        where: whereQA,
        required: false,
      },
      distinct: true,
      order,
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
  const { question } = req.params;

  try {
    res.json(question);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findAllByProductId = async (req, res, next) => {
  const { productId } = req.params;

  let { status } = req.query;
  if (status && !Array.isArray(status)) {
    status = [status];
  }

  const { limit, offset, order } = new QueryBuilder(req.query)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  const { where } = new QueryBuilder(req.query)
    .where("productId", productId)
    .whereLike("content", req.query.q)
    .whereIn("status", status)
    .build();

  try {
    const questions = await Question.model.findAndCountAll({
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

    res.json(questions);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const answer = async (req, res, next) => {
  const { userId } = req.auth;
  const { question } = req;
  const { content } = req.body;

  try {
    if (question.status !== Question.enums.status.queue) {
      throw badRequest("Question is not in queue");
    }

    const answer = await sequelize.transaction(async (t) => {
      const _answer = await Answer.model.create(
        {
          content,
          employeeId: userId,
          questionId: question.id,
        },
        {
          transaction: t,
        }
      );
      await question.update(
        {
          status: Question.enums.status.answered,
        },
        {
          transaction: t,
        }
      );

      return _answer;
    });

    res.json(answer);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const reject = async (req, res, next) => {
  const { question } = req;

  try {
    if (question.status !== Question.enums.status.queue) {
      throw badRequest("Question is not in queue");
    }

    await question.update({
      status: Question.enums.status.rejected,
    });

    res.json({
      message: "Question rejected",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateQuestionId,
  validateProductId,
  findAll,
  findOne,
  findAllByProductId,
  answer,
  reject,
};
