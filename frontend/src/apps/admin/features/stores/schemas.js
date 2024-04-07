import { object, string } from "yup";
import { parseString } from "@/utils";

const response = string()
  .label("Response")
  .transform(parseString)
  .min(3)
  .max(255)
  .default("")
  .required();
const status = string()
  .label("Action")
  .transform(parseString)
  .default("")
  .required();

export const requestVerifySchema = object({
  response,
  status,
});

export const requestVerifyInitial = requestVerifySchema.getDefault();
