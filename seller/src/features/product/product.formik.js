import * as Yup from 'yup';
import { PRODUCT_CONDITIONS, QUESTION_STATES } from './product.constants';

const name = Yup.string().label('Name').min(3).max(255);
const description = Yup.string().label('Description').min(3).max(255);
const stock = Yup.number().label('Stock').integer().min(0);
const price = Yup.number().label('Price').min(1);
const available = Yup.boolean().label('Available');
const condition = Yup.string()
  .label('Condition')
  .oneOf(Object.values(PRODUCT_CONDITIONS));
const categoryId = Yup.string().label('Category').uuid();

export const validationSchema = Yup.object({
  name: name.required(),
  description: description.required(),
  stock: stock.required(),
  price: price.required(),
  available: available.required(),
  condition: condition.required(),
  categoryId: categoryId.required('You must select a category'),
});

export const initialValues = {
  name: 'Teclado',
  description: 'Some fancy keyboard',
  stock: 1,
  price: 1,
  available: false,
  condition: PRODUCT_CONDITIONS.NEW,
  categoryId: '',
};

export const withInitialValues = (initialValues) => {
  const condition = Object.values(PRODUCT_CONDITIONS).find((condition) => {
    return condition.toLowerCase() === initialValues.condition.toLowerCase();
  });

  return {
    name: initialValues.name,
    description: initialValues.description || '',
    stock: initialValues.stock,
    price: +initialValues.price,
    available: initialValues.available,
    condition,
    categoryId: initialValues.categoryId,
  };
};

// PRODUCT QUESTIONS
export const answerQuestionSchema = Yup.object({
  answer: Yup.string().label('Answer').min(3).max(255).required(),
});
export const answerQuestionInitial = {
  answer: '',
};
