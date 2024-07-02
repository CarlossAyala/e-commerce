import { number, object } from "yup";

const quantity = number()
  .label("Quantity")
  .integer()
  .transform((value) => (value ? value : 0))
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
