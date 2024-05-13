// eslint-disable-next-line no-unused-vars
import express from "express";
import { Op } from "sequelize";
import { QueryBuilder } from "../../../libs/index.js";
import { Product, ProductImage } from "../../../database/mysql/models/index.js";
import { notFound } from "../../../middlewares/index.js";

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} productId
 */
export const findById = async (req, _res, next, productId) => {
  try {
    const product = await Product.model.findByPk(productId, { raw: true });
    if (!product) {
      throw notFound("Product not found");
    }
    const gallery = await ProductImage.model.findAll({
      where: {
        productId,
      },
      order: [["order", "ASC"]],
    });
    product.gallery = gallery;

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
export const findOne = async (req, res, next) => {
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
export const findAll = async (req, res, next) => {
  const qb = new QueryBuilder(req.query)
    .whereLike("name", req.query.q)
    .orderBy("name", "ASC")
    .pagination()
    .build();

  try {
    const products = await Product.model.findAndCountAll({
      ...qb,
      include: {
        model: ProductImage.model,
        as: "gallery",
        required: false,
        order: [["order", "ASC"]],
        limit: 1,
        separate: true,
      },
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
export const findRelated = async (req, res, next) => {
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
      include: {
        model: ProductImage.model,
        as: "gallery",
        required: false,
        order: [["order", "ASC"]],
        limit: 1,
        separate: true,
      },
      limit,
      offset,
    });

    res.json(related);
  } catch (error) {
    next(error);
  }
};
