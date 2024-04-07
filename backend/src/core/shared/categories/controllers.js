// eslint-disable-next-line no-unused-vars
const express = require("express");
const { Category } = require("../../../database/mysql/models");
const { notFound } = require("../../../middlewares");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} categoryId
 */
const validateCategoryId = async (req, _res, next, categoryId) => {
  try {
    const category = await Category.model.findByPk(categoryId);
    if (!category) {
      throw notFound("Category not found");
    }

    req.category = category;
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
  try {
    const categories = await Category.model.findAll({
      order: [["name", "ASC"]],
    });

    res.json(categories);
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
  const { category } = req;

  try {
    res.json(category);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateCategoryId,
  findAll,
  findOne,
};
