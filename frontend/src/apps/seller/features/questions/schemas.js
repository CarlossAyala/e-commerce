import { object, string } from "yup";
import { parseString } from "@/utils";

const answer = string()
  .label("Answer")
  .transform(parseString)
  .min(5)
  .max(255)
  .default("")
  .required();

export const replySchema = object({
  answer,
});

export const replyInitial = replySchema.getDefault();
