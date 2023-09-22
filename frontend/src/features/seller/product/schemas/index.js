import { string, number, object, boolean } from "yup";
import { PRODUCT_CONDITIONS } from "../utils";
import { parseNumber } from "../../../../utils/schema";

const name = string().label("Name").min(3).max(255).default("").required();
const description = string()
  .label("Description")
  .min(3)
  .max(255)
  .default("")
  .required();
const stock = number()
  .label("Stock")
  .transform(parseNumber)
  .integer()
  .min(0)
  .default(0)
  .required();
const stockAlert = number()
  .label("Stock alert")
  .transform(parseNumber)
  .integer()
  .min(0)
  .nullable()
  .default("");
const price = number()
  .label("Price")
  .transform(parseNumber)
  .min(1)
  .nonNullable("Price is required")
  .default("");
const available = boolean().label("Available").default(false);
const condition = string()
  .label("Condition")
  .oneOf(PRODUCT_CONDITIONS)
  .default(PRODUCT_CONDITIONS.at(0))
  .required();
const categoryId = string()
  .label("Category")
  .uuid()
  .default("")
  .required("You must select a category");

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

export const productDefault = (initialValues) => {
  const condition = PRODUCT_CONDITIONS.find((condition) => {
    return condition.toLowerCase() === initialValues.condition;
  });
  return {
    name: initialValues.name,
    description: initialValues.description ?? "",
    stock: initialValues.stock,
    stockAlert: initialValues.stockAlert,
    price: +initialValues.price,
    available: initialValues.available,
    condition,
    categoryId: initialValues.categoryId,
  };
};
