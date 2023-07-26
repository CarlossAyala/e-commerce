import * as Yup from 'yup';

const name = Yup.string().label('Name').min(3).max(255).required();
const lastName = Yup.string().label('Last Name').min(3).max(255).required();
const email = Yup.string().label('Email').email().required();
const password = Yup.string().label('Password').min(8).max(255).required();
const confirmPassword = Yup.string()
  .label('Confirm Password')
  .oneOf([Yup.ref('password')], 'Passwords must match')
  .required();

export const validationSchema = Yup.object({
  name,
  lastName,
  email,
  password,
  confirmPassword,
});

export const initialValues = {
  name: 'carlos',
  lastName: 'ayala',
  email: 'customer@customer.com',
  password: '123123123123',
  confirmPassword: '123123123123',
};
