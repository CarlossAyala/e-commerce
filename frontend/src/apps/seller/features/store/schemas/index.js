import { object, string } from "yup";
import { parseString } from "@/utils";

const name = string()
  .label("Name")
  .transform(parseString)
  .min(3)
  .max(255)
  .default("")
  .required();
const description = string()
  .label("Description")
  .transform(parseString)
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

export const requestVerifySchema = object({
  description,
});
export const requestVerifyInitial = requestVerifySchema.getDefault();
