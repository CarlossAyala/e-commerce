// // eslint-disable-next-line no-unused-vars
// import express from "express";
// import {
//   Question,
//   Answer,
//   Product,
//   ProductImage,
// } from "../../../database/mysql/models/index.js";
// import { QueryBuilder } from "../../../libs/index.js";
// import { notFound } from "../../../middlewares/index.js";

const db = require("../../../db/mysql/models");
const { NotFound } = require("../../../utils/http-errors");
const QueryBuilder = require("../../../utils/query-builder");

const QuestionModel = db.sequelize.model("Question");
const AnswerModel = db.sequelize.model("Answer");
const ProductModel = db.sequelize.model("Product");
const ProductImageModel = db.sequelize.model("ProductImage");

const validateProductId = async (req, _res, next, productId) => {
  try {
    const product = await ProductModel.findByPk(productId);
    if (!product) {
      throw new NotFound("Product not found");
    }

    req.product = product;
    next();
  } catch (error) {
    next(error);
  }
};

const findAllCustomer = async (req, res, next) => {
  const { userId } = req.auth;

  const { where, order, limit, offset } = new QueryBuilder(req.query)
    .where("customerId", userId)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const qa = await QuestionModel.findAndCountAll({
      where,
      include: [
        {
          model: AnswerModel,
          as: "answer",
        },
        {
          model: ProductModel,
          as: "product",
          include: {
            model: ProductImageModel,
            as: "gallery",
            separate: true,
            order: [["order", "ASC"]],
            required: false,
          },
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
    const qa = await QuestionModel.findAndCountAll({
      where,
      include: [
        {
          model: AnswerModel,
          as: "answer",
        },
        {
          model: ProductModel,
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

const create = async (req, res, next) => {
  const { userId } = req.auth;
  const { productId } = req.params;
  const { content } = req.body;

  try {
    const question = await QuestionModel.create({
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
