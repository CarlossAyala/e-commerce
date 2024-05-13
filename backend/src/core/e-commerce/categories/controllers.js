// eslint-disable-next-line no-unused-vars
import express from "express";
import {
  Category,
  Product,
  ProductImage,
} from "../../../database/mysql/models/index.js";
import { notFound } from "../../../middlewares/index.js";
import { Op, Sequelize } from "sequelize";

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} categoryId
 */
export const validateCategoryId = async (req, _res, next, categoryId) => {
  try {
    const category = await Category.model.findByPk(categoryId);
    if (!category) throw notFound("Category not found");

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
export const getRandoms = async (req, res, next) => {
  const { category } = req;

  try {
    const products = await Product.model.findAll({
      where: {
        categoryId: category.id,
        stock: {
          [Op.gt]: 0,
        },
        available: true,
      },
      include: {
        model: ProductImage.model,
        as: "gallery",
        order: [["order", "ASC"]],
        separate: true,
        required: false,
      },
      order: Sequelize.literal("RAND()"),
      limit: 10,
      offset: 0,
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
};
