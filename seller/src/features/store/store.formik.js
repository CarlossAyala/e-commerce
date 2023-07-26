import * as Yup from 'yup';

const name = Yup.string().label('Name').min(3).max(255);

const description = Yup.string().label('Description').min(3).max(255);

export const validationSchema = Yup.object({
  name: name.required(),
  description: description.required(),
});

export const changeNameSchema = Yup.object({
  name: name.required(),
});

export const changeDescSchema = Yup.object({
  description: description.required(),
});

export const withName = (values) => {
  return {
    name: values.name,
  };
};

export const withDescription = (values) => {
  return {
    description: values.description,
  };
};

export const initialValues = {
  name: 'Some fancy name',
  description: '',
};
