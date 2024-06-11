const sequelize = require("../../../db/mysql");
const { NotFound } = require("../../../utils/http-errors");
const QueryBuilder = require("../../../utils/query-builder");

const ProductModel = sequelize.model("Product");
const QuestionModel = sequelize.model("Question");

const validateProductId = async (req, _res, next, productId) => {
  try {
    const product = await ProductModel.findByPk(productId);
    if (!product) {
      throw new NotFound("Product not found");
    }

    req.product = product;
    next();
  } catch (error) {
    next(error);
  }
};

const findAllProducts = async (req, res, next) => {
  const { productId } = req.params;

  const { where, order, limit, offset } = new QueryBuilder(req.query)
    .where("status", "answered")
    .whereLike("content", req.query.q)
    .where("productId", productId)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const qa = await QuestionModel.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    res.json(qa);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateProductId,
  findAllProducts,
};
