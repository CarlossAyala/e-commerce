// eslint-disable-next-line no-unused-vars
const express = require("express");
const { Store } = require("../../../database/mysql/models");
const { badRequest } = require("../../../middlewares");
const { slugify } = require("../../../libs");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const find = async (req, res, next) => {
  const { store } = req;

  try {
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
const create = async (req, res, next) => {
  const { userId } = req.auth;
  const { name, description } = req.body;
  const slug = slugify(name);

  try {
    const store = await Store.model.findOne({
      where: {
        slug,
      },
    });

    if (store?.sellerId === userId) {
      throw badRequest("You already have a store.");
    } else if (store) {
      throw badRequest("There is already a store with the same name");
    }

    const newStore = await Store.model.create({
      name,
      description,
      sellerId: userId,
      slug,
    });

    res.status(201).json(newStore);
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
  const { userId } = req.auth;
  const { store } = req;
  const { name, description } = req.body;
  const slug = slugify(name);

  try {
    const storeExist = await Store.model.findOne({
      where: {
        slug,
      },
    });

    if (storeExist && storeExist.sellerId !== userId) {
      throw badRequest("There is already a store with the same name");
    }

    await store.update({
      name,
      slug,
      description,
    });

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
const remove = async (req, res, next) => {
  const { store } = req;

  try {
    await store.destroy();

    res.json({
      message: "Store deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  find,
  create,
  update,
  remove,
};
