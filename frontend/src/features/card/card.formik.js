import * as Yup from 'yup';
import { Formater } from '../utils/helpers';

const name = Yup.string().min(1).max(100);
const lastname = Yup.string().min(1).max(100);
const number = Yup.string().length(16);
const expiration = Yup.date().min(new Date());
const cvv = Yup.string().min(3).max(4);

export const schema = Yup.object({
  name: name.required('Name is required'),
  lastname: lastname.required('Last name is required'),
  number: number.required('Credit card number is required'),
  expiration: expiration.required('Expiration is required'),
  cvv: cvv.required('CVV is required'),
});

export const initial = {
  name: '',
  lastname: '',
  number: '4634822367125914',
  expiration: '',
  cvv: '',
};

export const withData = (data) => {
  return {
    name: data.name ?? '',
    lastname: data.lastname ?? '',
    number: data.number ?? '',
    expiration: Formater.dateForm(data.expiration),
    cvv: data.cvv ?? '',
  };
};
