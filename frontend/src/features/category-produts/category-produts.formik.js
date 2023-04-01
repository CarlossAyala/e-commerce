import * as Yup from 'yup';

export const schema = Yup.object().shape({
  stores: Yup.array().of(Yup.string()),
  condition: Yup.array().of(Yup.string()),
  official: Yup.boolean(),
  price_gt: Yup.number().min(1).label('Min'),
  price_lt: Yup.number()
    .label('Max')
    .when('price_gt', ([value], schema) =>
      value ? schema.moreThan(Yup.ref('price_gt')) : schema.min(1)
    ),
});

export const initial = {
  stores: [],
  condition: [],
  official: false,
  price_gt: '',
  price_lt: '',
};

export const withData = (data) => {
  return {
    stores: data?.stores ?? [],
    condition: data?.condition ?? [],
    official: data?.official ?? false,
    price_gt: data?.price_gt ?? '',
    price_lt: data?.price_lt ?? '',
  };
};
