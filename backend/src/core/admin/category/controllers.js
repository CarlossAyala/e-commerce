// eslint-disable-next-line no-unused-vars
const express = require("express");
const { Op } = require("sequelize");
const { Category, Product } = require("../../../database/mysql/models");
const { notFound, badRequest } = require("../../../middlewares");
const { slugify } = require("../../../libs");
const sequelize = require("../../../database/mysql/connection");

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
 * @param {express.Request} _req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findAll = async (_req, res, next) => {
  try {
    const categories = await Category.model.findAll({
      include: {
        model: Category.model,
        as: "children",
      },
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

  const { main, sub } = Category.enums.type;

  try {
    let _category;
    if (category.type === main) {
      _category = await Category.model.findByPk(category.id, {
        include: {
          model: Category.model,
          as: "children",
          separate: true,
          order: [["name", "ASC"]],
        },
      });
    } else if (category.type === sub) {
      _category = await Category.model.findByPk(category.id, {
        include: {
          model: Category.model,
          as: "parent",
        },
      });
    } else {
      _category = category;
    }

    res.json(_category);
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
  const { name, description, type } = req.body;

  const slug = slugify(name);

  try {
    const _category = await Category.model.findOne({
      where: {
        slug,
      },
    });
    if (_category) {
      throw badRequest("Category already exists");
    }

    const category = await Category.model.create({
      name,
      description,
      slug,
      type,
    });

    res.status(201).json(category);
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
  const { category } = req;
  const { name, description } = req.body;

  const slug = slugify(name);

  try {
    if (category.slug !== slug) {
      const _category = await Category.model.findOne({
        where: {
          slug,
        },
      });
      if (_category) {
        throw badRequest("Category already exists");
      }
    }

    await category.update({
      name,
      description,
      slug,
    });

    res.json(category);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const attach = async (req, res, next) => {
  const { category } = req;
  const { categoriesId } = req.body;

  const { main, sub } = Category.enums.type;
  try {
    if (category.type !== main) {
      throw badRequest(`${category.name} category need be a main category`);
    }

    const categories = await Category.model.findAll({
      where: {
        id: {
          [Op.in]: categoriesId,
        },
      },
    });

    // all categories need be a sub or single category
    for (const _category of categories) {
      if (_category.type === main) {
        throw badRequest(
          `${_category.name} category need be a sub or single category`
        );
      }
    }

    await sequelize.transaction(async (t) => {
      await Category.model.update(
        {
          parentId: category.id,
          type: sub,
        },
        {
          where: {
            id: {
              [Op.in]: categoriesId,
            },
          },
          transaction: t,
        }
      );
    });

    res.json({ message: "Categories attached successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const detach = async (req, res, next) => {
  const { category } = req;
  const { categoriesId } = req.body;

  const { main, single } = Category.enums.type;
  try {
    if (category.type !== main) {
      throw badRequest(`${category.name} category need be a main category`);
    }

    const categories = await Category.model.findAll({
      where: {
        id: {
          [Op.in]: categoriesId,
        },
      },
    });

    for (const _category of categories) {
      if (_category.parentId !== category.id) {
        throw badRequest(
          `${_category} category is not a sub category of ${category.name}`
        );
      }
    }

    await sequelize.transaction(async (t) => {
      await Category.model.update(
        {
          parentId: null,
          type: single,
        },
        {
          where: {
            id: {
              [Op.in]: categoriesId,
            },
          },
          transaction: t,
        }
      );
    });

    res.json({ message: "Categories detached successfully" });
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
  const { category } = req;

  const { main, sub } = Category.enums.type;

  try {
    await sequelize.transaction(async (t) => {
      switch (category.type) {
        case main: {
          const subCategories = await Category.model.findAll({
            where: {
              parentId: category.id,
            },
          });
          if (subCategories.length > 0) {
            throw badRequest("Category need be empty");
          }

          await category.destroy({ transaction: t });
          break;
        }
        case sub: {
          await Product.model.update(
            { categoryId: null, available: false },
            {
              where: { categoryId: category.id },
              transaction: t,
            }
          );

          await category.destroy({ transaction: t });
          break;
        }
        default: {
          await category.destroy({ transaction: t });
        }
      }
    });

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateCategoryId,
  findAll,
  findOne,
  create,
  update,
  attach,
  detach,
  remove,
};
