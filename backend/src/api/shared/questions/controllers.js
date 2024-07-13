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

  const { where, order, limit, offset, page } = new QueryBuilder(req.query)
    .where("status", "answered")
    .whereLike("content", req.query?.q)
    .where("productId", productId)
    .orderBy("id", "DESC")
    .build();

  try {
    const { rows, count } = await QuestionModel.findAndCountAll({
      where,
      offset,
      limit,
      order,
    });

    const hasNextPage = offset + limit < count;
    const nextPage = hasNextPage ? page + 1 : null;

    res.json({
      rows,
      count,
      hasNextPage,
      nextPage,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateProductId,
  findAllProducts,
};
