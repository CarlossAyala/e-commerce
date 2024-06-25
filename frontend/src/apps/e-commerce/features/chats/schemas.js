import { string, object } from "yup";

const text = string().label("Message").default("").required();

export const createSchema = object({
  text,
});
export const messageInitial = createSchema.getDefault();
