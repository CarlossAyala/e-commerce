// eslint-disable-next-line no-unused-vars
import express from "express";
import { QueryBuilder } from "../../../libs/index.js";
import { notFound } from "../../../middlewares/index.js";
import {
  Store,
  Product,
  ProductImage,
  StoreImage,
} from "../../../database/mysql/models/index.js";

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
export const findOne = async (req, res, next) => {
  const { storeId } = req.params;

  try {
    const store = await Store.model.findByPk(storeId, {
      raw: true,
    });
    if (!store) {
      throw notFound("Store not found");
    }
    const gallery = await StoreImage.model.findAll({
      where: {
        storeId,
      },
      order: [["order", "ASC"]],
    });
    store.gallery = gallery;

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
export const findByProductId = async (req, res, next) => {
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
export const findProducts = async (req, res, next) => {
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

    const products = await Product.model.findAndCountAll({
      ...qb,
      include: {
        model: ProductImage.model,
        as: "gallery",
        required: false,
        order: [["order", "ASC"]],
        separate: true,
      },
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
};
