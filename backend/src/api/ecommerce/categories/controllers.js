const { Op, Sequelize } = require("sequelize");
const sequelize = require("../../../db/mysql");
const { NotFound } = require("../../../utils/http-errors");

const CategoryModel = sequelize.model("Category");
const ProductModel = sequelize.model("Product");
const ProductGalleryModel = sequelize.model("ProductGallery");

const validateCategoryId = async (req, _res, next, categoryId) => {
  try {
    const category = await CategoryModel.findByPk(categoryId);
    if (!category) {
      throw new NotFound("Category not found");
    }

    req.category = category;
    next();
  } catch (error) {
    next(error);
  }
};

const getRandoms = async (req, res, next) => {
  const { category } = req;

  try {
    const products = await ProductModel.findAll({
      where: {
        categoryId: category.id,
        stock: {
          [Op.gt]: 0,
        },
        available: true,
      },
      include: {
        model: ProductGalleryModel,
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

module.exports = {
  validateCategoryId,
  getRandoms,
};
