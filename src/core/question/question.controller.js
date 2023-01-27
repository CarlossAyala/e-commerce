const QuestionService = require('./question.service');

const QuestionProvider = new QuestionService();

const getOne = async (req, res, next) => {
  try {
    const resoure = await QuestionProvider.getOne(req.params.id);

    res.status(200).json(resoure);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resources = await QuestionProvider.getAll(resourceId);

    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const question = req.body.question;
    const customerId = req.auth.id;
    const productId = req.params.id;

    await QuestionProvider.create({
      question,
      customerId,
      productId,
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

    // If exist an answer, then remove it
    const answer = await QuestionProvider.getAnswer(questionId);
    if (answer) await QuestionProvider.removeAnswer(questionId);

    await QuestionProvider.removeQuestion(questionId);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

// Can only be updated if the question was not answered
// See questionHasAnswer middleware
const update = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const question = req.body;

    await QuestionProvider.update(resourceId, question);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getOne,
  getAll,
  update,
  remove,
};
