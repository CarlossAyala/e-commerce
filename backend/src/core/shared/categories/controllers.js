// eslint-disable-next-line no-unused-vars
import express from "express";
import { Op } from "sequelize";
import {
  Category,
  CategoryImage,
} from "../../../database/mysql/models/index.js";
import { notFound } from "../../../middlewares/index.js";

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} categoryId
 */
export const validateCategoryId = async (req, _res, next, categoryId) => {
  try {
    const category = await Category.model.findByPk(categoryId, {
      raw: true,
    });
    if (!category) {
      throw notFound("Category not found");
    }
    const gallery = await CategoryImage.model.findAll({
      where: {
        categoryId,
      },
    });
    category.gallery = gallery;

    if (category.parentId) {
      const parentId = await Category.model.findByPk(category.parentId);
      category.parent = parentId;
    }
    if (!category.parentId) {
      const children = await Category.model.findAll({
        where: {
          parentId: category.id,
        },
      });
      category.children = children;
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
export const findAll = async (req, res, next) => {
  try {
    const categories = await Category.model.findAll({
      where: {
        parentId: {
          [Op.is]: null,
        },
      },
      include: [
        {
          model: Category.model,
          as: "children",
          required: false,
          order: [["name", "ASC"]],
          separate: true,
          include: [
            {
              model: CategoryImage.model,
              as: "gallery",
              required: false,
              order: [["order", "ASC"]],
              separate: true,
            },
          ],
        },
        {
          model: CategoryImage.model,
          as: "gallery",
          required: false,
          order: [["order", "ASC"]],
          separate: true,
        },
      ],
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
export const findOne = async (req, res, next) => {
  const { category } = req;

  try {
    res.json(category);
  } catch (error) {
    next(error);
  }
};
