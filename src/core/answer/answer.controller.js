const { Question } = require('../../database/mysql/models');
const AnswerService = require('./answer.service');

const AnswerProvider = new AnswerService();

const getOne = async (req, res, next) => {
  try {
    const questionId = req.params.id;
    // Question and Answer
    const QA = await AnswerProvider.getOne(questionId);

    res.status(200).json(QA);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const resources = await AnswerProvider.getAll(productId);

    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
};

// It is not possible to create a answer with state 'queue'
// See update create and update schemas
const answer = async (req, res, next) => {
  try {
    const { answer, state } = req.body;
    const employeeId = req.auth.id;
    const questionId = req.params.id;

    await AnswerProvider.updateQuestionState(questionId, state);

    await AnswerProvider.create({
      answer,
      employeeId,
      questionId,
    });

    res.status(201).json({
      message: 'Created successfully',
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const questionId = req.params.id;
    const state = Question.enums.states.queue;

    await AnswerProvider.updateQuestionState(questionId, state);
    await AnswerProvider.removeAnswer(questionId);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const employeeId = req.auth.id;
    const questionId = req.params.id;
    const { answer, state } = req.body;

    // If state is equal to 'queue', then the answer is deleted
    // else response the question normally
    if (state === Question.enums.states.queue) {
      await AnswerProvider.updateQuestionState(questionId, state);
      await AnswerProvider.removeAnswer(questionId);
    } else {
      await AnswerProvider.updateQuestionState(questionId, state);
      await AnswerProvider.update(questionId, {
        answer,
        employeeId,
      });
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  answer,
  getOne,
  getAll,
  update,
  remove,
};
