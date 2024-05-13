import { object, string } from "yup";
import { parseString } from "@/utils";

const content = string()
  .label("Answer")
  .transform(parseString)
  .min(5)
  .max(255)
  .default("")
  .required();

export const replySchema = object({
  content,
});

export const replyInitial = replySchema.getDefault();
