import { number, object } from "yup";
import { parseNumber } from "@/utils";

// TODO DELETE
export const addCartSchema = (stock = 0) => {
  const quantity = number()
    .label("Quantity")
    .transform((num) => {
      return parseNumber(num, 0);
    })
    .integer()
    .min(stock > 0 ? 1 : 0)
    .max(stock, "Stock is not enough")
    .default(stock > 0 ? 1 : 0)
    .required();

  return object({
    quantity,
  });
};

export const addCartInitial = (stock) => {
  const schema = addCartSchema(stock);

  return schema.getDefault();
};

const quantity = number()
  .label("Quantity")
  .integer()
  .transform((num) => {
    return parseNumber(num, 0);
  })
  .min(1, () => "Minimum quantity is 1")
  .default(1)
  .required();

export const addToCartSchema = (stock) => {
  return object({
    quantity: quantity.max(stock, () => "Stock is not enough"),
  });
};
export const addToCartInitial = () => {
  return addToCartSchema().getDefault();
};
