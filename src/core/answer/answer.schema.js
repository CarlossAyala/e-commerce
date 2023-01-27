const Joi = require('joi');
const { Question } = require('../../database/mysql/models');

const statesEnums = Object.values(Question.enums.states);

const createStates = statesEnums.filter(
  (state) => state !== Question.enums.states.queue
);

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const answer = Joi.string().max(255);
const updateState = Joi.string().valid(...statesEnums);
const createState = Joi.string().valid(...createStates);

const resourceId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  answer: answer.required(),
  state: createState.required(),
});

const update = Joi.object({
  answer: answer.required(),
  state: updateState.required(),
});

module.exports = {
  resourceId,
  create,
  update,
};
