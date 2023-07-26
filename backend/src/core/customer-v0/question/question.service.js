const { Question, Answer } = require('../../database/mysql/models');

class QuestionService {
  create({ question, customerId, productId }) {
    const states = Question.enums.states.queue;

    return Question.model.create({
      question,
      states,
      customerId,
      productId,
    });
  }

  getOne(id) {
    return Question.model.findByPk(id, {
      include: {
        model: Answer.model,
        as: 'answer',
        attributes: ['id', 'answer'],
      },
    });
  }

  getAll(id) {
    const states = Question.enums.states.answered;

    return Question.model.findAll({
      where: {
        productId: id,
        states,
      },
      include: {
        model: Answer.model,
        as: 'answer',
      },
    });
  }

  update(id, { question }) {
    return Question.model.update(
      { question },
      {
        where: {
          id,
        },
      }
    );
  }

  getAnswer(id) {
    return Answer.model.findOne({
      where: {
        questionId: id,
      },
      attributes: ['id'],
    });
  }

  removeQuestion(id) {
    return Question.model.destroy({
      where: {
        id,
      },
    });
  }

  removeAnswer(id) {
    return Answer.model.destroy({
      where: {
        questionId: id,
      },
    });
  }
}

module.exports = QuestionService;
