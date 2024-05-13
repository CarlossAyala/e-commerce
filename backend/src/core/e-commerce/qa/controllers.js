// eslint-disable-next-line no-unused-vars
import express from "express";
import {
  Question,
  Answer,
  Product,
  ProductImage,
} from "../../../database/mysql/models/index.js";
import { QueryBuilder } from "../../../libs/index.js";
import { notFound } from "../../../middlewares/index.js";

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} productId
 */
export const validateProductId = async (req, _res, next, productId) => {
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
export const findAllCustomer = async (req, res, next) => {
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
          include: {
            model: ProductImage.model,
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

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const findAllCustomerByProduct = async (req, res, next) => {
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
export const create = async (req, res, next) => {
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
