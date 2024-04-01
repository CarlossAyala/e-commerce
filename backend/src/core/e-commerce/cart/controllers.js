// eslint-disable-next-line no-unused-vars
const express = require("express");
const { CartProduct, Product } = require("../../../database/mysql/models");
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
const findAll = async (req, res, next) => {
  const { userId: customerId } = req.auth;

  try {
    const cart = await CartProduct.model.findAll({
      where: {
        customerId,
      },
      include: {
        model: Product.model,
        as: "product",
      },
      order: [["createdAt", "ASC"]],
    });

    res.json(cart);
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
  const { userId: customerId } = req.auth;
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    let item = await CartProduct.model.findOne({
      where: {
        customerId,
        productId,
      },
    });

    if (!item) {
      item = await CartProduct.model.create({
        customerId,
        productId,
        quantity,
      });
    } else {
      await item.update({ quantity });
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const update = async (req, res, next) => {
  const { userId: customerId } = req.auth;
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const item = await CartProduct.model.findOne({
      where: {
        customerId,
        productId,
      },
    });

    if (!item) throw notFound("Item not found");

    await item.update({ quantity });

    res.json(item);
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
  const { userId: customerId } = req.auth;
  const { productId } = req.params;

  try {
    await CartProduct.model.destroy({
      where: {
        customerId,
        productId,
      },
    });

    res.json({
      message: "Item removed from cart",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateProductId,
  findAll,
  create,
  update,
  remove,
};
