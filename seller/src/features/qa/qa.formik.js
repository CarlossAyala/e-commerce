import { object, string } from "yup";

export const answerSchema = object({
  answer: string().label("Answer").min(3).max(255).default("").required(),
});

export const answerDefault = answerSchema.getDefault();
