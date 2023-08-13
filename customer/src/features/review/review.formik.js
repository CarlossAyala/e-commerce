import { mixed, object, string } from 'yup';
import { REVIEW_RATING } from './review.constants';

const description = string()
  .label('Description')
  .default('')
  .min(5)
  .max(255)
  .required();
const rating = mixed()
  .label('Rating')
  .default('')
  .oneOf(REVIEW_RATING)
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
