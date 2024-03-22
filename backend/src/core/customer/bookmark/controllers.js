// eslint-disable-next-line no-unused-vars
const express = require("express");
const { QueryBuilder } = require("../../../libs");
const { Bookmark, Product } = require("../../../database/mysql/models");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findAll = async (req, res, next) => {
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
const findOne = async (req, res, next) => {
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
const create = async (req, res, next) => {
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
const clear = async (req, res, next) => {
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
const remove = async (req, res, next) => {
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

module.exports = {
  findAll,
  findOne,
  create,
  clear,
  remove,
};
