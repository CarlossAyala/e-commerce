import { string, number, object, boolean, array } from "yup";
import { parseNumber, parseString } from "@/shared/utils";
import { PRODUCT_CONDITIONS } from "./utils";

const name = string()
  .label("Name")
  .transform(parseString)
  .min(3)
  .max(255)
  .default("")
  .required();
const description = string()
  .label("Description")
  .transform(parseString)
  .min(3)
  .max(255)
  .default("")
  .required();
const stock = number()
  .label("Stock")
  .transform((num) => parseNumber(num))
  .integer()
  .min(0)
  .default("")
  .required();
const price = number()
  .label("Price")
  .transform((num) => parseNumber(num))
  .min(0)
  .default("")
  .required();
const available = boolean().label("Available").default(false);
const condition = string()
  .label("Condition")
  .oneOf(PRODUCT_CONDITIONS.map((c) => c.value))
  .required();
const categoryId = string()
  .transform(parseString)
  .label("Category")
  .default("")
  .required();
const gallery = array().label("Gallery").default([]);

export const createSchema = object({
  name,
  description,
  stock,
  price,
  available,
  condition,
  categoryId,
  gallery,
});
export const productInitial = createSchema.getDefault();

export const updateSchema = object({
  name,
  description,
  stock,
  price,
  available,
  condition,
  categoryId,
  currentGallery: gallery,
  nextGallery: gallery,
});

export const productDefault = (values = {}) => ({
  name: values.name ?? "",
  description: values.description ?? "",
  stock: values.stock ?? "",
  price: values.price ?? "",
  available: values.available ?? "",
  condition: values.condition ?? "",
  categoryId: values.categoryId ?? "",
  currentGallery: values.gallery ?? [],
  nextGallery: [],
});
