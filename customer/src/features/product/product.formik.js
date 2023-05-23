import * as Yup from 'yup';

const search = Yup.string().min(2).max(255);
const question = Yup.string().min(5).max(255);

export const questionSchema = Yup.object({
  question: question.required('Question is required'),
});

export const searchSchema = Yup.object({
  search,
});

export const questionInitial = {
  question: '',
};

export const searchInitial = {
  search: '',
};
