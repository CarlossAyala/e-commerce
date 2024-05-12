const { Op } = require("sequelize");
const db = require("../../../db/mysql/models");
const { NotFound } = require("../../../utils/http-errors");
const QueryBuilder = require("../../../utils/query-builder");

const ProductModel = db.sequelize.model("Product");
const ProductImageModel = db.sequelize.model("ProductImage");

const findById = async (req, _res, next, productId) => {
  try {
    const product = await ProductModel.findByPk(productId, { raw: true });
    if (!product) {
      throw new NotFound("Product not found");
    }
    const gallery = await ProductImageModel.findAll({
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
        model: ProductImageModel,
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
        model: ProductImageModel,
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
