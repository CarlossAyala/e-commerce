const Joi = require('joi');
const { Question } = require('../../../database/mysql/models');

const validStates = [Question.enums.states.rejected];

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

// const base = Joi.object({});
const answer = Joi.object({
  answer: Joi.string().label('answer').min(3).max(255),
  states: Joi.string()
    .label('states')
    .lowercase()
    .trim()
    .valid(...validStates),
}).xor('answer', 'states');

const resourceId = Joi.object({
  id: id.required(),
});

module.exports = {
  // base,
  resourceId,
  answer,
};
