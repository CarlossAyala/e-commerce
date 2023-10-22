import { string, object, array } from "yup";
import { parseString } from "../../../../../utils";
import { categoryTypes } from "../utils";

const id = string()
  .label("Category")
  .transform(parseString)
  .uuid()
  .default("")
  .required();
const name = string()
  .label("Name")
  .transform(parseString)
  .min(3)
  .max(50)
  .default("")
  .required();
const description = string()
  .label("Description")
  .transform(parseString)
  .min(3)
  .max(255)
  .default("")
  .required();
const type = string()
  .label("Type")
  .oneOf([categoryTypes.main, categoryTypes.single])
  .default(categoryTypes.main)
  .required();
const categoriesId = array()
  .label("Categories")
  .min(1)
  .of(id)
  .default([])
  .required();

export const newCategorySchema = object({
  name,
  description,
  type,
});
export const attachCategorySchema = object({
  categoryId: id,
  categoriesId,
});
export const detachCategorySchema = object({
  categoryId: id,
  categoriesId,
});
export const updateCategorySchema = object({
  name,
  description,
});

export const newCategoryInitial = newCategorySchema.getDefault();
export const attachCategoryInitial = attachCategorySchema.getDefault();
export const detachCategoryInitial = detachCategorySchema.getDefault();
export const updateCategoryInitial = updateCategorySchema.getDefault();

export const updateCategoryDefault = (values) => ({
  name: values?.name ?? updateCategoryInitial.name,
  description: values?.description ?? updateCategoryInitial.description,
});
