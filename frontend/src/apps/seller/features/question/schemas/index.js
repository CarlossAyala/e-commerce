import { object, string } from "yup";
import { parseString } from "@/utils";

const answer = string()
  .label("Name")
  .transform(parseString)
  .min(3)
  .max(255)
  .default("")
  .required();

export const replySchema = object({
  answer,
});

export const replyInitial = replySchema.getDefault();
