import { object, ref, string } from "yup";
import { parseString } from "../../utils/schema";

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
  .default("")
  .required();

export const signupSchema = object({
  name,
  lastName,
  email,
  password,
  confirmPassword: confirmPassword.oneOf(
    [ref("password")],
    "Passwords must match",
  ),
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
  oldPassword: password.label("Current password"),
  newPassword: password.label("New password"),
  confirmPassword: confirmPassword.oneOf(
    [ref("newPassword")],
    "Passwords must match",
  ),
});

export const signupInitial = signupSchema.getDefault();
export const signinInitial = signinSchema.getDefault();
export const changeProfileInitial = changeNameSchema.getDefault();
export const changePasswordInitial = changePasswordSchema.getDefault();

export const changeProfileDefault = (value) => ({
  name: value?.name ?? changeProfileInitial.name,
  lastName: value?.lastName ?? changeProfileInitial.lastName,
});
