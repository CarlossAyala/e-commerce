import { object, ref, string } from "yup";

const name = string().label("Name").min(3).max(255).required();
const lastName = string().label("Last name").min(3).max(255).required();
const email = string().label("Email").email().required();
const password = string().label("Password").min(8).max(255).required();
const validatePassword = string()
  .label("Confirm password")
  .oneOf([ref("password")], "Passwords must match")
  .required();
const oldPassword = string().label("Old password").min(8).max(255).required();
const newPassword = string().label("New password").min(8).max(255).required();
const confirmPassword = string()
  .label("Confirm password")
  .oneOf([ref("newPassword")], "Passwords must match")
  .required();

export const signupSchema = object({
  name,
  lastName,
  email,
  password,
  validatePassword,
});

export const signupInitial = {
  name: "carlos",
  lastName: "ayala",
  email: "customer@customer.com",
  password: "123123123123",
  validatePassword: "123123123123",
};

export const signinSchema = object({
  email,
  password,
});

export const signinInitial = {
  email: "owner@owner.com",
  password: "ownerowner",
};

export const changeNameSchema = object({
  name,
  lastName,
});
export const changeNameInitial = (values) => ({
  name: values.name,
  lastName: values.lastName,
});

export const changePasswordSchema = object({
  oldPassword,
  newPassword,
  confirmPassword,
});
export const changePasswordInitial = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
