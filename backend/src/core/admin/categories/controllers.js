// eslint-disable-next-line no-unused-vars
import express from "express";
import path from "path";
import { unlink } from "node:fs/promises";
import { Op } from "sequelize";
import {
  Category,
  CategoryImage,
  Product,
} from "../../../database/mysql/models/index.js";
import { notFound, badRequest } from "../../../middlewares/index.js";
import { slugify } from "../../../libs/index.js";

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
    const gallery = await CategoryImage.model.findAll({
      where: {
        categoryId,
      },
    });
    req.gallery = gallery;

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
const getAll = async (_req, res, next) => {
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
          include: {
            model: CategoryImage.model,
            as: "gallery",
            required: false,
            order: [["order", "ASC"]],
            separate: true,
          },
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
const getCount = async (req, res, next) => {
  try {
    const count = await Category.model.count();

    res.json(count);
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
    if (category.parentId) {
      const _category = await Category.model.findByPk(category.id, {
        include: [
          {
            model: Category.model,
            as: "parent",
          },
          {
            model: CategoryImage.model,
            as: "gallery",
            separate: true,
            order: [["order", "ASC"]],
            required: false,
          },
        ],
      });

      res.json(_category);
    } else {
      const _category = await Category.model.findByPk(category.id, {
        include: [
          {
            model: Category.model,
            as: "children",
            include: {
              model: CategoryImage.model,
              as: "gallery",
              required: false,
              order: [["order", "ASC"]],
              separate: true,
            },
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

      res.json(_category);
    }
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
  const { name, description } = req.body;
  const gallery = req.files;

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
    });
    await CategoryImage.model.bulkCreate(
      gallery.map((file, index) => ({
        filename: file.filename,
        order: index,
        url:
          req.protocol + "://" + req.get("host") + "/images/" + file.filename,
        categoryId: category.id,
      }))
    );

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
  const { name, description, currentGallery } = req.body;
  const newGallery = req.files;

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

    const gallery = await CategoryImage.model.findAll({
      where: {
        categoryId: category.id,
      },
    });
    const galleryToDelete = gallery.filter(
      (image) => !currentGallery.includes(image.id)
    );
    if (galleryToDelete.length) {
      await Promise.all(
        galleryToDelete.map((image) => {
          const filePath = path.join(
            __dirname,
            "../../../../public/images",
            image.filename
          );
          return unlink(filePath);
        })
      );
      await CategoryImage.model.destroy({
        where: {
          id: {
            [Op.in]: galleryToDelete.map((image) => image.id),
          },
        },
      });
    }

    const galleryToUpdate = gallery.filter((image) =>
      currentGallery.includes(image.id)
    );
    if (galleryToUpdate.length) {
      await Promise.all(
        galleryToUpdate.map((image, index) => {
          return image.update({
            order: index,
          });
        })
      );
    }

    if (newGallery.length) {
      await CategoryImage.model.bulkCreate(
        newGallery.map((file, index) => ({
          filename: file.filename,
          order: galleryToUpdate.length + index,
          url:
            req.protocol + "://" + req.get("host") + "/images/" + file.filename,
          categoryId: category.id,
        }))
      );
    }

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

  try {
    if (category.parentId) {
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
      const hasSubCategories = await Category.model.findOne({
        where: {
          parentId: _category.id,
        },
      });
      if (hasSubCategories) {
        throw badRequest(`${_category.name} need be without any sub-category`);
      }
    }

    await Category.model.update(
      {
        parentId: category.id,
      },
      {
        where: {
          id: {
            [Op.in]: categoriesId,
          },
        },
      }
    );

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

  try {
    if (category.parentId) {
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

    await Category.model.update(
      {
        parentId: null,
      },
      {
        where: {
          id: {
            [Op.in]: categoriesId,
          },
        },
      }
    );

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

  try {
    if (!category.parentId) {
      const subs = await Category.model.findAll({
        where: {
          parentId: category.id,
        },
      });
      if (subs.length) {
        throw badRequest("Category need be empty");
      }
    }

    const gallery = await CategoryImage.model.findAll({
      where: {
        categoryId: category.id,
      },
    });
    if (gallery.length) {
      await Promise.all(
        gallery.map((image) => {
          const filePath = path.join(
            __dirname,
            "../../../../public/images",
            image.filename
          );
          return unlink(filePath);
        })
      );
      await CategoryImage.model.destroy({
        where: {
          categoryId: category.id,
        },
      });
    }

    await Product.model.update(
      {
        categoryId: null,
      },
      {
        where: {
          categoryId: category.id,
        },
      }
    );

    await Category.model.destroy({
      where: {
        id: category.id,
      },
    });

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default {
  validateCategoryId,
  getAll,
  create,
  getCount,
  findOne,
  update,
  attach,
  detach,
  remove,
};
