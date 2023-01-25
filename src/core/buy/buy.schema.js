const Joi = require('joi');
// const { Charge } = require('../../database/mysql/models');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const resourceId = Joi.object({
  id: id.required(),
});

const destinationId = id;
const cardId = id;

const buy = Joi.object({
  // Address
  destinationId: destinationId.required(),
  // Payment Method
  cardId: cardId.required(),
});

module.exports = {
  resourceId,
  buy,
};
