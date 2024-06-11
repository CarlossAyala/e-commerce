const { Op } = require("sequelize");
const { NotFound } = require("../../../utils/http-errors");
const QueryBuilder = require("../../../utils/query-builder");
const sequelize = require("../../../db/mysql");

const ProductModel = sequelize.model("Product");
const ProductGalleryModel = sequelize.model("ProductGallery");

const findById = async (req, _res, next, productId) => {
  try {
    const product = await ProductModel.findByPk(productId, { raw: true });
    if (!product) {
      throw new NotFound("Product not found");
    }
    const gallery = await ProductGalleryModel.findAll({
      where: {
        productId,
      },
      order: [["order", "ASC"]],
      raw: true,
    });
    product.gallery = gallery;

    req.product = product;
    next();
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  const { product } = req;

  try {
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  const qb = new QueryBuilder(req.query)
    .whereLike("name", req.query.q)
    .orderBy("name", "ASC")
    .pagination()
    .build();

  try {
    const products = await ProductModel.findAndCountAll({
      ...qb,
      include: {
        model: ProductGalleryModel,
        as: "gallery",
        required: false,
        order: [["order", "ASC"]],
        limit: 1,
        separate: true,
      },
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
};

const findRelated = async (req, res, next) => {
  const { product } = req;
  const { storeId, categoryId } = product;

  const { limit, offset } = new QueryBuilder(req.query).pagination().build();

  try {
    const related = await ProductModel.findAndCountAll({
      where: {
        [Op.or]: {
          categoryId,
          storeId,
        },
        [Op.not]: {
          id: product.id,
        },
      },
      include: {
        model: ProductGalleryModel,
        as: "gallery",
        required: false,
        order: [["order", "ASC"]],
        limit: 1,
        separate: true,
      },
      limit,
      offset,
    });

    res.json(related);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findById,
  findOne,
  findAll,
  findRelated,
};
