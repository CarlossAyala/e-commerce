const Boom = require('@hapi/boom');
const { Product } = require('../../database/mysql/models');
const AnswerService = require('./answer.service');

const AnswerProvider = new AnswerService();

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

const answerExist = async (req, res, next) => {
  try {
    const questionId = req.params.id;
    const answer = await AnswerProvider.getAnswer(questionId);

    if (answer) return next(Boom.notFound('Question already has an answer'));

    next();
  } catch (error) {
    next(error);
  }
};

const answerAlreadyExist = async (req, res, next) => {
  try {
    const questionId = req.params.id;
    const answer = await AnswerProvider.getAnswer(questionId);

    if (!answer) return next(Boom.notFound('Answer not found'));

    next();
  } catch (error) {
    next(error);
  }
};

const questionExist = async (req, res, next) => {
  try {
    const questionId = req.params.id;
    const question = await AnswerProvider.getQuestion(questionId);

    if (!question) return next(Boom.notFound('Question not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  productExist,
  answerExist,
  questionExist,
  answerAlreadyExist,
};
