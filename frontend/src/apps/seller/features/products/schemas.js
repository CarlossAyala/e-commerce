import { string, number, object, boolean } from "yup";
import { parseNumber, parseString } from "@/utils";
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

export const productSchema = object({
  name,
  description,
  stock,
  price,
  available,
  condition,
  categoryId,
});
export const productInitial = productSchema.getDefault();
export const productDefault = (values = {}) => ({
  name: values.name ?? "",
  description: values.description ?? "",
  stock: values.stock ?? "",
  price: values.price ?? "",
  available: values.available ?? "",
  condition: values.condition ?? "",
  categoryId: values.categoryId ?? "",
});
