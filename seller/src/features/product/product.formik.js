import * as Yup from "yup";
import { PRODUCT_CONDITIONS } from "./product.constants";

const name = Yup.string().label("Name").min(3).max(255).default("").required();
const description = Yup.string()
  .label("Description")
  .min(3)
  .max(255)
  .default("")
  .required();
const stock = Yup.number()
  .label("Stock")
  .integer()
  .min(0)
  .default(0)
  .required();
const stockAlert = Yup.number()
  .label("Stock alert")
  .integer()
  .min(0)
  .default(0)
  .required();
const price = Yup.number().label("Price").min(1).default(1);
const available = Yup.boolean().label("Available").default(false);
const condition = Yup.string()
  .label("Condition")
  .oneOf(PRODUCT_CONDITIONS)
  .default(PRODUCT_CONDITIONS.at(0))
  .required();
const categoryId = Yup.string()
  .label("Category")
  .uuid()
  .default("")
  .required("You must select a category");

export const productSchema = Yup.object({
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
