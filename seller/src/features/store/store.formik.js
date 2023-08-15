import * as Yup from 'yup';

const name = Yup.string().label('Name').min(3).max(255).required();

const description = Yup.string()
  .label('Description')
  .min(3)
  .max(255)
  .required();

export const storeSchema = Yup.object({
  name,
  description,
});

export const changeNameSchema = Yup.object({
  name,
});

export const changeDescriptionSchema = Yup.object({
  description,
});

export const storeNameDefault = (values) => {
  return {
    name: values.name,
  };
};

export const storeDescriptionDefault = (values) => {
  return {
    description: values.description,
  };
};

export const storeInitial = {
  name: 'Coca Cola',
  description: 'Lorem ipsum dolor sit amet',
};
