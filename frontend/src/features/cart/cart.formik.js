import * as Yup from 'yup';

const quantity = Yup.number().integer().moreThan(0);

export const schema = Yup.object({
  quantity: quantity.required(),
});

export const initial = {
  quantity: '',
};

export const withData = (data) => {
  return {
    quantity: data.quantity,
  };
};
