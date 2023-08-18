import * as Yup from "yup";
import { PRODUCT_CONDITIONS } from "./product.constants";

const name = Yup.string().label("Name").min(3).max(255).default("");
const description = Yup.string()
  .label("Description")
  .min(3)
  .max(255)
  .default("");
const stock = Yup.number().label("Stock").integer().min(0).default(0);
const price = Yup.number().label("Price").min(1).default(1);
const available = Yup.boolean().label("Available").default(false);
const condition = Yup.string()
  .label("Condition")
  .oneOf(PRODUCT_CONDITIONS)
  .default(PRODUCT_CONDITIONS.at(0));
const categoryId = Yup.string().label("Category").uuid().default("");

export const productSchema = Yup.object({
  name: name.required(),
  description: description.required(),
  stock: stock.required(),
  price: price.required(),
  available: available.required(),
  condition: condition.required(),
  categoryId: categoryId.required("You must select a category"),
});

export const productInitial = productSchema.getDefault();

export const productDefault = (initialValues) => {
  const condition = PRODUCT_CONDITIONS.find((condition) => {
    return condition.toLowerCase() === initialValues.condition;
  });

  return {
    name: initialValues.name,
    description: initialValues.description || "",
    stock: initialValues.stock,
    price: +initialValues.price,
    available: initialValues.available,
    condition,
    categoryId: initialValues.categoryId,
  };
};
