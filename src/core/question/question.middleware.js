const Boom = require('@hapi/boom');
const { Product } = require('../../database/mysql/models');
const QuestionService = require('./question.service');

const QuestionProvider = new QuestionService();

const resourceExist = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await QuestionProvider.getOne(resourceId);

    if (!resource) return next(Boom.notFound('Question not found'));

    next();
  } catch (error) {
    next(error);
  }
};

const productExist = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await Product.model.findByPk(resourceId);

    if (!resource) return next(Boom.notFound('Product not found'));

    next();
  } catch (error) {
    next(error);
  }
};

const questionHasAnswer = async (req, res, next) => {
  try {
    const questionId = req.params.id;
    const answer = await QuestionProvider.getAnswer(questionId);

    if (answer)
      return next(Boom.notFound('Question has already been answered'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  resourceExist,
  productExist,
  questionHasAnswer,
};
