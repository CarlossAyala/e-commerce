import Joi from "joi";

const id = Joi.string().guid();

const name = Joi.string().label("Name").min(3).max(50).required();
const description = Joi.string()
  .label("Description")
  .min(3)
  .max(255)
  .required();
const categoryId = id.label("Category");
const categoriesId = Joi.array().label("Categories").min(1).items(categoryId);

const create = Joi.object({
  name,
  description,
});

const categoryIds = Joi.object({
  categoriesId,
});

const update = Joi.object({
  name,
  description,
  currentGallery: Joi.array()
    .label("Current Gallery")
    .items(id)
    .max(10)
    .allow(null)
    .default([]),
});

export default { create, categoryIds, update };
