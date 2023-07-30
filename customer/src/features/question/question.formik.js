import { object, string } from 'yup';

const question = string().label('Question').min(5).max(255);

export const createQuestionSchema = object({
  question: question.required(),
});

export const createQuestionInitial = {
  question: '',
};
