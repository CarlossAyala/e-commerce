// eslint-disable-next-line no-unused-vars
const express = require("express");
const { QueryBuilder } = require("../../../libs");
const { Question, Product } = require("../../../database/mysql/models");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findAll = async (req, res, next) => {
  const { store } = req;
  const { where, limit, offset } = new QueryBuilder(req.query)
    .where("storeId", store.id)
    .whereLike("name", req.query.q)
    .pagination()
    .build();

  try {
    const questions = await Question.model.findAndCountAll({
      where: {
        status: Question.enums.status.queue,
      },
      include: {
        model: Product.model,
        as: "product",
        where,
      },
      limit,
      offset,
    });

    res.json(questions);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
};
