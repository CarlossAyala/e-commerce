import { string, object, array } from "yup";

const categoryId = string().label("Category").default("").required();
const name = string().label("Name").min(3).max(50).default("").required();
const description = string()
  .label("Description")
  .min(3)
  .max(255)
  .default("")
  .required();
const categoriesId = array()
  .label("Categories")
  .min(1)
  .of(categoryId)
  .default([])
  .required();
const gallery = array().default([]);

export const newCategorySchema = object({
  name,
  description,
  gallery,
});
export const attachCategorySchema = object({
  categoriesId,
});
export const detachCategorySchema = object({
  categoriesId,
});
export const updateCategorySchema = object({
  name,
  description,
  currentGallery: gallery,
  nextGallery: gallery,
});

export const newCategoryInitial = newCategorySchema.getDefault();
export const attachCategoryInitial = attachCategorySchema.getDefault();
export const detachCategoryInitial = detachCategorySchema.getDefault();
export const updateCategoryInitial = updateCategorySchema.getDefault();

export const updateCategoryDefault = (values) => ({
  name: values?.name ?? updateCategoryInitial.name,
  description: values?.description ?? updateCategoryInitial.description,
  currentGallery: values?.gallery ?? updateCategoryInitial.currentGallery,
  nextGallery: updateCategoryInitial.currentGallery,
});
