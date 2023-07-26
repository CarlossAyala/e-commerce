const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const name = Joi.string().min(3).max(255).trim().required();
const description = Joi.string().min(3).max(255).required();

const base = Joi.object({
  name,
  description,
});

const checkName = Joi.object({
  name,
});

const changeName = Joi.object({
  name,
});

const changeDescription = Joi.object({
  description,
});

module.exports = {
  base,
  checkName,
  changeName,
  changeDescription,
};
