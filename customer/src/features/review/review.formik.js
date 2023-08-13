import { number, object, string } from 'yup';

const description = string()
  .label('Description')
  .default('')
  .min(5)
  .max(255)
  .required();
const rating = number()
  .label('Rating')
  .integer()
  .default('')
  .min(1)
  .max(5)
  .required();

export const reviewSchema = object({
  description,
  rating,
});

export const newReviewInitial = reviewSchema.getDefault();

export const editReviewInitial = (review) => ({
  description: review.description ?? '',
  rating: review.rating ?? '',
});
