import { number, object, string } from "yup";
import { parseNumber } from "../../../../../shared/utils/schema";

const rating = number()
  .label("Rating")
  .integer()
  .transform((num) => parseNumber(num))
  .min(1)
  .max(5)
  .default("")
  .required();
const description = string()
  .label("Description")
  .min(5)
  .max(255)
  .default("")
  .required();

export const reviewSchema = object({
  rating,
  description,
});

export const reviewDefault = reviewSchema.getDefault();
