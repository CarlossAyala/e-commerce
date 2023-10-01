import { object, string } from "yup";
import { parseString } from "../../../../../utils/schema";

const question = string()
  .label("Question")
  .transform(parseString)
  .min(5)
  .max(255)
  .default("")
  .required();

export const questionSchema = object({
  question,
});

export const questionDefault = questionSchema.getDefault();
