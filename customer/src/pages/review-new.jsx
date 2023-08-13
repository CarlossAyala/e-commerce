import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Button, TextArea } from '@carbon/react';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import {
  REVIEW_RATING,
  TABS_OPTIONS,
  newReviewInitial,
  reviewSchema,
  useCreateReview,
  useGetReview,
} from '../features/review';
import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import { findReviewIndex } from '../features/review';

const ReviewStar = ({
  values,
  errors,
  touched,
  isSubmitting,
  handleBlur,
  setFieldValue,
}) => {
  const onChange = (rating) => {
    setFieldValue('rating', rating);
  };

  return (
    <RadioGroup
      name='rating'
      value={values.rating}
      disabled={isSubmitting}
      onChange={onChange}
      onBlur={handleBlur}
    >
      <RadioGroup.Label className='text-xs leading-tight text-black/70'>
        Rating
      </RadioGroup.Label>

      <div className='mt-1 flex items-center justify-center gap-x-4'>
        {REVIEW_RATING.map((rating, index) => {
          const ratingValue = index;
          const ratingForm = findReviewIndex(values.rating);

          return (
            <RadioGroup.Option
              className='flex flex-col items-center'
              value={rating}
              key={rating}
            >
              <div className='group rounded-full p-2 hover:cursor-pointer hover:bg-indigo-100'>
                {ratingValue <= ratingForm ? (
                  <StarSolid className='h-8 w-8 text-indigo-600' />
                ) : (
                  <StarOutline className='h-8 w-8 text-gray-400 group-hover:text-gray-600' />
                )}
              </div>
              <div className='text-center'>
                <p
                  className={clsx(
                    'text-xs leading-tight',
                    ratingValue === ratingForm
                      ? 'text-indigo-600'
                      : 'text-gray-400'
                  )}
                >
                  {REVIEW_RATING[index]}
                </p>
              </div>
            </RadioGroup.Option>
          );
        })}
      </div>
      {errors.rating && touched.rating && (
        <div className='mt-2'>
          <p className='text-xs leading-tight text-red-600'>{errors.rating}</p>
        </div>
      )}
    </RadioGroup>
  );
};

const ReviewNew = () => {
  const { reviewId } = useParams();
  const navigate = useNavigate('/review/list?tab=done');

  const review = useGetReview(reviewId);
  const create = useCreateReview(reviewId);
  console.log('Review', review);

  const handleSubmit = async (values, actions) => {
    try {
      await create.mutateAsync(values);
      navigate(`/review/list?tab=${TABS_OPTIONS.DONE}`);
    } catch (error) {
      console.log('<ReviewNew />');
      console.log('handleSubmit', error);
    } finally {
      actions.setSubmitting(false);
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
                    setFieldValue,
                  }) => (
                    <Form>
                      <h2 className='text-base font-semibold leading-6 text-gray-900'>
                        Review
                      </h2>
                      <div className='space-y-6'>
                        <ReviewStar
                          values={values}
                          errors={errors}
                          touched={touched}
                          isSubmitting={isSubmitting}
                          handleChange={handleChange}
                          setFieldValue={setFieldValue}
                        />
                        <TextArea
                          id='review-description'
                          name='description'
                          labelText='Description'
                          rows={4}
                          enableCounter
                          maxCount={255}
                          placeholder='Tell us more about your product'
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
