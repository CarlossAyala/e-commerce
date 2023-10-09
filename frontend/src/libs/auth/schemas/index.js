import { object, ref, string } from "yup";
import { parseString } from "../../../utils/schema";

const name = string()
  .transform(parseString)
  .label("Name")
  .min(3)
  .max(255)
  .default("")
  .required();
const lastName = string()
  .label("Last name")
  .transform(parseString)
  .min(3)
  .max(255)
  .default("")
  .required();
const email = string()
  .label("Email")
  .transform(parseString)
  .email()
  .default("")
  .required();
const password = string()
  .label("Password")
  .transform(parseString)
  .min(8)
  .max(255)
  .default("")
  .required();
const confirmPassword = string()
  .label("Confirm password")
  .transform(parseString)
  .oneOf([ref("password")], "Passwords must match")
  .default("")
  .required();

export const signupSchema = object({
  name,
  lastName,
  email,
  password,
  confirmPassword,
});
export const signinSchema = object({
  email,
  password,
});
export const changeNameSchema = object({
  name,
  lastName,
});
export const changePasswordSchema = object({
  oldPassword: string().label("Old password").min(8).max(255).required(),
  password: string().label("New password").min(8).max(255).required(),
  confirmPassword: string()
    .label("Confirm password")
    .oneOf([ref("password")], "Passwords must match")
    .required(),
});

export const signupInitial = signupSchema.getDefault();
export const signinInitial = signinSchema.getDefault();
export const changeNameInitial = changeNameSchema.getDefault();
export const changePasswordInitial = changePasswordSchema.getDefault();

export const changeNameDefault = (value) => ({
  name: value?.name ?? changeNameInitial.name,
  lastName: value?.lastName ?? changeNameInitial.lastName,
});
