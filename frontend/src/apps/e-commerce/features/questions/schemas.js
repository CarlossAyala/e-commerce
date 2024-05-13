import { object, string } from "yup";
import { parseString } from "../../../../utils/schema";

const content = string()
  .label("Content")
  .transform(parseString)
  .min(5)
  .max(255)
  .default("")
  .required();

export const questionSchema = object({
  content,
});

export const questionDefault = questionSchema.getDefault();
