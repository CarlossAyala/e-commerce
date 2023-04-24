const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const uuidV4 = Joi.object({
  id: id.required(),
});

module.exports = {
  uuidV4,
};
