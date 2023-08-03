const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const resourceId = Joi.object({
  id: id.required(),
});

// slug
const resourceSlug = Joi.object({
  slug: Joi.string().required(),
});

module.exports = {
  resourceId,
  resourceSlug,
};
