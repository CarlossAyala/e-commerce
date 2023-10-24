const Joi = require("joi");
const { RequestOfficialStore } = require("../../../database/mysql/models");

const { approved, rejected } = RequestOfficialStore.enums.status;

const id = Joi.string().guid({
  version: "uuidv4",
  separator: "-",
});

const response = Joi.string().label("Response").min(3).max(255).required();
const status = Joi.string()
  .label("Status")
  .valid(...[approved, rejected])
  .required();

const resourceId = Joi.object({
  id: id.required(),
});

const update = Joi.object({
  response,
  status,
});

module.exports = {
  resourceId,
  update,
};
