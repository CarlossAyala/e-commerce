const sequelize = require("../../../db/mysql");
const { NotFound } = require("../../../utils/http-errors");
const QueryBuilder = require("../../../utils/query-builder");

const QuestionModel = sequelize.model("Question");
const ProductModel = sequelize.model("Product");
const ProductGalleryModel = sequelize.model("ProductGallery");

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

const findAllCustomer = async (req, res, next) => {
  const { userId } = req.auth;

  const { where, order, limit, offset } = new QueryBuilder(req.query)
    .where("userId", userId)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const questions = await QuestionModel.findAndCountAll({
      where,
      include: {
        model: ProductModel,
        as: "product",
        include: {
          model: ProductGalleryModel,
          as: "gallery",
          separate: true,
          order: [["order", "ASC"]],
          required: false,
        },
      },
      order,
      limit,
      offset,
    });

    res.json(questions);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { userId } = req.auth;
  const { productId } = req.params;
  const { content } = req.body;

  try {
    const question = await QuestionModel.create({
      userId,
      productId,
      content,
    });

    res.status(201).json(question);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateProductId,
  findAllCustomer,
  create,
};
