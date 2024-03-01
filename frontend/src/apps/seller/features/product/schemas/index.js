import { string, number, object, boolean } from "yup";
import { PRODUCT_CONDITIONS } from "../utils";
import { parseNumber, parseString } from "../../../../../utils/schema";

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
const stockAlert = number()
  .label("Stock alert")
  .transform((num) => parseNumber(num))
  .integer()
  .min(1)
  .notRequired()
  .default("");
const price = number()
  .label("Price")
  .transform((num) => parseNumber(num))
  .min(1)
  .default("")
  .required();
const available = boolean().label("Available").default(false);
const condition = string()
  .label("Condition")
  .oneOf(PRODUCT_CONDITIONS)
  .default(PRODUCT_CONDITIONS.at(0))
  .required();
const categoryId = string()
  .transform(parseString)
  .label("Category")
  .uuid()
  .default("")
  .required();

export const productSchema = object({
  name,
  description,
  stock,
  stockAlert,
  price,
  available,
  condition,
  categoryId,
});
export const productInitial = productSchema.getDefault();
export const productDefault = (initialValues = {}) => {
  const condition = PRODUCT_CONDITIONS.find((condition) => {
    return condition.toLowerCase() === initialValues.condition;
  });
  return {
    name: initialValues.name ?? "",
    description: initialValues.description ?? "",
    stock: initialValues.stock ?? "",
    stockAlert: initialValues.stockAlert ?? "",
    price: initialValues.price ?? "",
    available: initialValues.available ?? false,
    condition: condition ?? PRODUCT_CONDITIONS.at(0),
    categoryId: initialValues.categoryId ?? "",
  };
};

export const stockAlertSchema = object({
  stock,
  stockAlert,
});
export const stockAlertDefault = (initialValues = {}) => {
  return {
    stock: initialValues.stock ?? "",
    stockAlert: initialValues.stockAlert ?? "",
  };
};
