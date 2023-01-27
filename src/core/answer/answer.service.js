const { Question, Answer } = require('../../database/mysql/models');

class AnswerService {
  create({ answer, employeeId, questionId }) {
    return Answer.model.create({
      answer,
      employeeId,
      questionId,
    });
  }

  getOne(id) {
    return Question.model.findByPk(id, {
      include: {
        model: Answer.model,
        as: 'answer',
      },
    });
  }

  getAll(id) {
    return Question.model.findAll({
      where: {
        productId: id,
      },
      include: {
        model: Answer.model,
        as: 'answer',
      },
    });
  }

  update(id, { answer, employeeId }) {
    return Answer.model.update(
      { answer, employeeId },
      {
        where: {
          questionId: id,
        },
      }
    );
  }

  getQuestion(id) {
    return Question.model.findOne({
      where: {
        id,
      },
    });
  }

  getAnswer(id) {
    return Answer.model.findOne({
      where: {
        questionId: id,
      },
    });
  }

  updateQuestionState(id, states) {
    return Question.model.update(
      { states },
      {
        where: {
          id,
        },
      }
    );
  }

  removeAnswer(id) {
    return Answer.model.destroy({
      where: {
        questionId: id,
      },
    });
  }
}

module.exports = AnswerService;
