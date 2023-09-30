import { number, object } from "yup";
import { parseNumber } from "../../../../../utils/schema";

const defaultQty = 0;
export const addCartSchema = (stock = 0) => {
  const quantity = number()
    .label("Quantity")
    .transform((num) => {
      return parseNumber(num, defaultQty);
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
