import { useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Button, TextArea } from '@carbon/react';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import {
  newReviewInitial,
  reviewSchema,
  useGetReview,
} from '../features/review';
import { useState } from 'react';

const REVIEW_STARS = 5;

const ReviewStar = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className='flex items-center gap-x-1'>
      {[...Array(REVIEW_STARS)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <label
            key={index}
            className='relative h-4 w-4 cursor-pointer'
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(rating)}
            onClick={() => setRating(ratingValue)}
            style={{
              color: ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9',
              backgroundColor:
                ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'inline-block',
              padding: '2px',
              margin: '0',
            }}
          >
            <input type='radio' name='' id='' />
            {ratingValue <= (hover || rating) ? (
              <StarSolid className='h-4 w-4 text-indigo-500' />
            ) : (
              <StarOutline className='h-4 w-4 text-indigo-500' />
            )}
          </label>
        );
      })}
    </div>
  );
};

// TODO: Add Pagination
const ReviewNew = () => {
  const { reviewId } = useParams();

  const review = useGetReview(reviewId);
  console.log('Review', review);

  const handleSubmit = async (values, actions) => {
    try {
      console.log('Values', values);
      console.log('Actions', actions);
    } catch (error) {
      console.log('<ReviewNew />');
      console.log('handleSubmit', error);
    }
  };

  return (
    <main className='flex w-full flex-col overflow-auto bg-white'>
      <section className='px-4 py-3'>
        <h1 className='text-base font-semibold leading-6 text-gray-900'>
          Create Review
        </h1>
        <p className='mt-1 text-sm text-gray-600'>
          What did you think of your product?
        </p>
      </section>

      <section className='space-y-4 px-4'>
        {review.isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {review.isSuccess && (
              <>
                <div>
                  <h2 className='text-base font-semibold leading-6 text-gray-900'>
                    Product
                  </h2>
                  <div className='mt-1 overflow-hidden rounded-lg border border-black/10'>
                    <div className='flex gap-x-2 p-2'>
                      <div className='h-16 w-16 shrink-0 overflow-hidden rounded-md border border-black/10 p-1'>
                        <img
                          className='h-full w-full object-contain'
                          src='https://http2.mlstatic.com/D_611826-MLA70608099348_072023-O.jpg'
                          alt='Testing img'
                        />
                      </div>
                      <div className='grow'>
                        <p className='line-clamp-1 text-sm font-semibold text-gray-900'>
                          {review.data.product.name}
                        </p>
                        <p className='line-clamp-2 text-sm font-medium leading-tight text-gray-600'>
                          {review.data.product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Formik
                  initialValues={newReviewInitial}
                  validationSchema={reviewSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                  }) => (
                    <Form>
                      <h2 className='text-base font-semibold leading-6 text-gray-900'>
                        Review
                      </h2>
                      <div className='mt-1 space-y-4'>
                        <ReviewStar />
                        <TextArea
                          id='review-description'
                          name='description'
                          labelText='Description'
                          rows={4}
                          enableCounter
                          maxCount={255}
                          placeholder='Describe your experience'
                          invalidText={errors.description}
                          invalid={errors.description && touched.description}
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className='mt-6'>
                        <Button type='submit'>Create review</Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default ReviewNew;
