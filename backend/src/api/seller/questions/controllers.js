const sequelize = require("../../../db/mysql");
const { NotFound, BadRequest } = require("../../../utils/http-errors");
const QueryBuilder = require("../../../utils/query-builder");

const QuestionModel = sequelize.model("Question");
const ProductModel = sequelize.model("Product");

const validateQuestionId = async (req, _res, next, questionId) => {
  const { store } = req;

  try {
    const question = await QuestionModel.findOne({
      where: {
        id: questionId,
      },
      include: {
        model: ProductModel,
        as: "product",
        where: {
          storeId: store.id,
        },
      },
    });
    if (!question) {
      throw new NotFound("Question not found");
    }

    req.question = question;
    next();
  } catch (error) {
    next(error);
  }
};

const validateProductId = async (req, _res, next, productId) => {
  const { store } = req;

  try {
    const product = await ProductModel.findOne({
      where: {
        id: productId,
        storeId: store.id,
      },
    });
    if (!product) {
      throw new NotFound("Product not found");
    }

    req.product = product;
    next();
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  const { store } = req;

  let { status } = req.query;
  if (status && !Array.isArray(status)) {
    status = [status];
  }
  const { where: whereQA } = new QueryBuilder(req.query)
    .whereIn("status", status)
    .build();

  const {
    where: whereProduct,
    order,
    limit,
    offset,
  } = new QueryBuilder(req.query)
    .where("storeId", store.id)
    .whereLike("name", req.query.q)
    .orderBy("name", "ASC")
    .pagination()
    .build();

  try {
    const products = await ProductModel.findAndCountAll({
      where: whereProduct,
      include: {
        model: QuestionModel,
        as: "questions",
        where: whereQA,
        required: false,
      },
      distinct: true,
      order,
      limit,
      offset,
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  const { question } = req.params;

  try {
    res.json(question);
  } catch (error) {
    next(error);
  }
};

const findAllByProductId = async (req, res, next) => {
  const { productId } = req.params;

  let { status } = req.query;
  if (status && !Array.isArray(status)) {
    status = [status];
  }

  const { limit, offset, order } = new QueryBuilder(req.query)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  const { where } = new QueryBuilder(req.query)
    .where("productId", productId)
    .whereLike("content", req.query.q)
    .whereIn("status", status)
    .build();

  try {
    const questions = await QuestionModel.findAndCountAll({
      where,
      include: {
        model: ProductModel,
        as: "product",
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

const answer = async (req, res, next) => {
  const { question } = req;
  const { answer } = req.body;

  try {
    if (question.status !== "pending") {
      throw new BadRequest("Question is not pending");
    }

    await question.update({
      answer,
      status: "answered",
    });

    res.json({ message: "Ok" });
  } catch (error) {
    next(error);
  }
};

const reject = async (req, res, next) => {
  const { question } = req;

  try {
    if (question.status !== "pending") {
      throw new BadRequest("Question is not pending");
    }

    await question.update({
      status: "rejected",
    });

    res.json({
      message: "Question rejected",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findOne,
  findAllByProductId,
  validateQuestionId,
  validateProductId,
  answer,
  reject,
};
