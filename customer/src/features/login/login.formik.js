import * as Yup from 'yup';

const email = Yup.string().email();
const password = Yup.string().min(8);

export const loginSchema = Yup.object().shape({
  email: email.required(),
  password: password.required(),
});

export const loginInitialValues = {
  email: 'owner@owner.com',
  password: 'ownerowner',
};
