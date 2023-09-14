import { object, ref, string } from "yup";

const name = string().label("Name").min(3).max(255).default("").required();
const lastName = string()
  .label("Last name")
  .min(3)
  .max(255)
  .default("")
  .required();
const email = string().label("Email").email().default("").required();
const password = string()
  .label("Password")
  .min(8)
  .max(255)
  .default("")
  .required();
const validatePassword = string()
  .label("Confirm password")
  .oneOf([ref("password")], "Passwords must match")
  .default("")
  .required();

export const signupSchema = object({
  name,
  lastName,
  email,
  password,
  validatePassword,
});

export const signupInitial = signupSchema.getDefault();

export const signinSchema = object({
  email,
  password,
});

export const signinInitial = signinSchema.getDefault();
