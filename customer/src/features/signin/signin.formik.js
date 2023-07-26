import * as Yup from 'yup';

const email = Yup.string().label('Email').email().required();
const password = Yup.string().label('Password').min(8).max(255).required();

export const validationSchema = Yup.object({
  email,
  password,
});

export const initialValues = {
  email: 'customer@customer.com',
  password: '123123123123',
};
