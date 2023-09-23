import { object, string } from "yup";

const answer = string().label("Name").min(3).max(255).default("").required();

export const replySchema = object({
  answer,
});

export const replyInitial = replySchema.getDefault();
