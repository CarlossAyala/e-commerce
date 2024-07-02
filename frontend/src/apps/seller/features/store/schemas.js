import { array, mixed, object, string } from "yup";
import { parseString } from "@/shared/utils";

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

export const createSchema = object({
  name,
  description,
});
export const createInitial = createSchema.getDefault();
export const createDefault = (values) => ({
  name: values?.name ?? createInitial.name,
  description: values?.description ?? createInitial.description,
});

export const updateSchema = object({
  name,
  description,
  profile: string().label("Profile").default(""),
  nextProfile: mixed().label("Profile").default(""),
  gallery: array().default([]),
  nextGallery: array().default([]),
});
export const updateDefault = (values) => ({
  name: values?.name ?? updateSchema.getDefault().name,
  description: values?.description ?? updateSchema.getDefault().description,
  profile: values?.url ?? updateSchema.getDefault().profile,
  nextProfile: updateSchema.getDefault().nextProfile,
  gallery: values?.gallery ?? updateSchema.getDefault().gallery,
  nextGallery: updateSchema.getDefault().nextGallery,
});
