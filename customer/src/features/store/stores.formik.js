import * as Yup from 'yup';

export const schema = Yup.object().shape({
  categories: Yup.array().of(Yup.string()),
  condition: Yup.array().of(Yup.string()),
  price_gt: Yup.number().min(1).label('Min'),
  price_lt: Yup.number()
    .label('Max')
    .when('price_gt', ([value], schema) =>
      value ? schema.moreThan(Yup.ref('price_gt')) : schema.min(1)
    ),
  stock: Yup.boolean(),
});

export const initial = {
  categories: [],
  condition: [],
  price_gt: '',
  price_lt: '',
  stock: true,
};

export const withData = (data) => {
  return {
    categories: data?.categories ?? [],
    condition: data?.condition ?? [],
    price_gt: data?.price_gt ?? '',
    price_lt: data?.price_lt ?? '',
    stock: data?.stock ?? true,
  };
};
