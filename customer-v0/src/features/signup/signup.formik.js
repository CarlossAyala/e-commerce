import * as Yup from 'yup';

const name = Yup.string().min(3).max(255).label('First name');
const lastName = Yup.string().min(3).max(255).label('Last name');
const email = Yup.string().email().label('Email');
const password = Yup.string().min(8).max(255).label('Password');
const confirmPassword = Yup.string()
  .oneOf([Yup.ref('password')], 'Passwords must match')
  .label('Confirm password');

export const schema = Yup.object().shape({
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
  confirmPassword: confirmPassword.required(),
});

export const initialValues = {
  name: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
