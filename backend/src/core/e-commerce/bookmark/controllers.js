// eslint-disable-next-line no-unused-vars
import express from "express";
import { QueryBuilder } from "../../../libs/index.js";
import {
  Bookmark,
  Product,
  ProductImage,
} from "../../../database/mysql/models/index.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const findAll = async (req, res, next) => {
  const { userId } = req.auth;
  const { order, limit, offset } = new QueryBuilder(req.query)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const bookmarks = await Bookmark.model.findAndCountAll({
      where: {
        customerId: userId,
      },
      include: {
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
      order,
      limit,
      offset,
    });

    res.json(bookmarks);
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
  const { userId } = req.auth;
  const { productId } = req.params;

  try {
    const bookmark = await Bookmark.model.findOne({
      where: {
        customerId: userId,
        productId,
      },
    });

    res.json(bookmark);
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

  try {
    const bookmark = await Bookmark.model.findOne({
      where: {
        customerId: userId,
        productId,
      },
    });
    if (!bookmark) {
      await Bookmark.model.create({
        customerId: userId,
        productId,
      });
    }

    res.json({ message: "Bookmark added" });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const clear = async (req, res, next) => {
  const { userId } = req.auth;

  try {
    await Bookmark.model.destroy({
      where: {
        customerId: userId,
      },
    });

    res.json({ message: "Bookmarks cleared" });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const remove = async (req, res, next) => {
  const { userId } = req.auth;
  const { productId } = req.params;

  try {
    await Bookmark.model.destroy({
      where: {
        customerId: userId,
        productId,
      },
    });

    res.json({ message: "Bookmark removed" });
  } catch (error) {
    next(error);
  }
};
