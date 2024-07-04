const { Op } = require("sequelize");
const sequelize = require("../../../db/mysql");
const { NotFound } = require("../../../utils/http-errors");

const CategoryModel = sequelize.model("Category");
const CategoryGalleryModel = sequelize.model("CategoryGallery");

const validateCategoryId = async (req, _res, next, categoryId) => {
  try {
    const category = await CategoryModel.findByPk(categoryId, {
      raw: true,
    });
    if (!category) {
      throw new NotFound("Category not found");
    }
    const gallery = await CategoryGalleryModel.findAll({
      where: {
        categoryId,
      },
    });
    category.gallery = gallery;

    if (category.parentId) {
      const parentId = await CategoryModel.findByPk(category.parentId);
      category.parent = parentId;
    }
    if (!category.parentId) {
      const children = await CategoryModel.findAll({
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

const findAll = async (_req, res, next) => {
  try {
    const categories = await CategoryModel.findAll({
      where: {
        parentId: {
          [Op.is]: null,
        },
      },
      include: [
        {
          model: CategoryModel,
          as: "children",
          required: false,
          order: [["name", "ASC"]],
          separate: true,
          include: [
            {
              model: CategoryGalleryModel,
              as: "gallery",
              required: false,
              order: [["order", "ASC"]],
              separate: true,
            },
          ],
        },
        {
          model: CategoryGalleryModel,
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
