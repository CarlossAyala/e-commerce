import { object, string } from "yup";

const name = string().label("Name").min(3).max(255).default("").required();
const description = string()
  .label("Description")
  .min(3)
  .max(255)
  .default("")
  .required();

export const storeSchema = object({
  name,
  description,
});

export const storeInitial = storeSchema.getDefault();

export const storeDefault = (values) => {
  return {
    name: values?.name ?? storeInitial.name,
    description: values?.description ?? storeInitial.description,
  };
};
