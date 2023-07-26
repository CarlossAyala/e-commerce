import * as Yup from 'yup';

const question = Yup.string().label('Question').min(3).max(255);

export const questionSchema = Yup.object({
  question: question.required(),
});

export const questionInitial = {
  question: '',
};
