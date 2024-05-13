import Joi from "joi";

const id = Joi.string().label("Gallery ID").uuid().required();

const name = Joi.string().label("Name").min(3).max(255).trim().required();
const description = Joi.string()
  .label("Description")
  .min(3)
  .max(255)
  .required();

export const create = Joi.object({
  name,
  description,
});

export const update = Joi.object({
  name,
  description,
  profile: Joi.string().label("Profile").allow("").required(),
  nextProfile: Joi.string().label("Next Profile").allow(""),
  gallery: Joi.array()
    .label("Current Gallery")
    .items(id)
    .max(10)
    .allow(null)
    .default([]),
});
