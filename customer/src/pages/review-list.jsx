import { Link } from 'react-router-dom';
import { getTimeAgo } from '../utils/formatter';
import {
  useDislikeReview,
  useGetCustomerDoneReviews,
  useGetCustomerPendingReviews,
  useLikeReview,
} from '../features/review';
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  StarIcon as StarOutline,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { Tab } from '@headlessui/react';

const REVIEW_STARS = 5;

const ReviewStars = ({ rating }) => {
  return (
    <div>
      <ol className='flex items-center gap-x-px'>
        {[...Array(REVIEW_STARS)].map((_, index) => (
          <li key={index} className='relative h-4 w-4'>
            <StarOutline className='absolute h-4 w-4 text-indigo-500' />
            <div
              className='absolute overflow-hidden'
              style={{
                width: rating >= index + 1 ? '100%' : '0%',
              }}
            >
              <StarSolid className='h-4 w-4 text-indigo-500' />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

// TODO: Add Pagination
const ReviewList = () => {
  const pending = useGetCustomerPendingReviews();
  const done = useGetCustomerDoneReviews();

  const likeReview = useLikeReview();
  const dislikeReview = useDislikeReview();
  console.log('Reviews Done', done);
  console.log('Reviews Pending', pending);

  const handleLikeReview = async (reviewId, productId) => {
    try {
      await likeReview.mutateAsync([reviewId, productId]);
    } catch (error) {
      console.log('<ReviewList />');
      console.log('handleLikeReview', error);
    }
  };

  const handleDislikeReview = async (reviewId, productId) => {
    try {
      await dislikeReview.mutateAsync([reviewId, productId]);
    } catch (error) {
      console.log('<ReviewList />');
      console.log('handleDislikeReview', error);
    }
  };

  return (
    <main className='flex w-full flex-col overflow-auto bg-white'>
      <section className='px-4 py-3'>
        <h1 className='text-base font-semibold leading-6 text-gray-900'>
          Review List
        </h1>
        <p className='mt-1 text-sm text-gray-600'>
          Here you will see a list of all the reviews you have made.
        </p>
      </section>

      <section className='px-4'>
        <Tab.Group>
          <div className='border-b border-black/10'>
            <Tab.List className='-mb-px space-x-6'>
              <Tab className='py-2 font-semibold text-gray-500 hover:border-b-2 hover:border-gray-200 hover:text-gray-600 ui-selected:border-b-2 ui-selected:border-indigo-600 ui-selected:text-indigo-600'>
                Pending
              </Tab>
              <Tab className='py-2 font-semibold text-gray-500 hover:border-b-2 hover:border-gray-200 hover:text-gray-600 ui-selected:border-b-2 ui-selected:border-indigo-600 ui-selected:text-indigo-600'>
                Done
              </Tab>
            </Tab.List>
          </div>
          <Tab.Panels className='mt-4'>
            <Tab.Panel>
              {pending.isLoading ? (
                <p>Loading...</p>
              ) : (
                <div>
                  {pending.isSuccess && pending.data.rows.length === 0 && (
                    <p className='text-sm text-gray-900'>
                      You haven&apos;t made any reviews yet.
                    </p>
                  )}

                  {pending.isSuccess && pending.data.rows.length > 0 && (
                    <ol className='space-y-4'>
                      {pending.data.rows.map((review) => (
                        <li key={review.id}>
                          <div className='flex justify-between gap-x-2'>
                            <Link>See purchase</Link>
                            <Link to={`/review/${review.id}/new`}>
                              Create review
                            </Link>
                          </div>
                          <div className='mt-1 flex gap-x-3 rounded-lg border border-black/10 p-2'>
                            <div className='h-16 w-16 shrink-0 overflow-hidden rounded-md border border-black/10 p-1'>
                              <img
                                className='h-full w-full object-contain'
                                src='https://http2.mlstatic.com/D_611826-MLA70608099348_072023-O.jpg'
                                alt='Testing img'
                              />
                            </div>
                            <div className='grow'>
                              <p className='line-clamp-1 text-sm font-semibold text-gray-900'>
                                {review.product.name}
                              </p>
                              <p className='line-clamp-2 text-sm text-gray-600'>
                                {review.product.description}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              )}
            </Tab.Panel>
            <Tab.Panel>
              {done.isLoading ? (
                <p>Loading...</p>
              ) : (
                <div>
                  {done.isSuccess && done.data.rows.length === 0 && (
                    <p className='text-sm text-gray-900'>
                      You haven&apos;t made any reviews yet.
                    </p>
                  )}

                  {done.isSuccess && done.data.rows.length > 0 && (
                    <ol className='space-y-4'>
                      {done.data.rows.map((review) => (
                        <li
                          key={review.id}
                          className='overflow-hidden rounded-lg border border-black/10'
                        >
                          <div className='flex gap-x-3 border-b border-black/10 p-2'>
                            <div className='h-16 w-16 shrink-0 overflow-hidden rounded-md border border-gray-300 p-1'>
                              <img
                                className='h-full w-full object-contain'
                                src='https://http2.mlstatic.com/D_611826-MLA70608099348_072023-O.jpg'
                                alt='Testing img'
                              />
                            </div>
                            <div className='grow'>
                              <p className='line-clamp-1 text-sm font-semibold text-gray-900'>
                                {review.product.name}
                              </p>
                              <p className='line-clamp-2 text-sm font-medium text-gray-800'>
                                {review.product.description}
                              </p>
                            </div>
                          </div>
                          <article className='p-2'>
                            <div className='flex items-center justify-between'>
                              <ReviewStars rating={review.rating} />
                              <span className='text-sm leading-tight text-gray-600'>
                                {getTimeAgo(review.createdAt)}
                              </span>
                            </div>
                            <div className='mb-2 mt-1'>
                              <p className='text-sm leading-tight text-gray-800'>
                                {review.description}
                              </p>
                            </div>
                            <div className='flex items-center gap-x-4'>
                              <button
                                onClick={() =>
                                  handleLikeReview(review.id, review.product.id)
                                }
                                className='flex items-center gap-x-1 rounded-md border border-gray-300 px-1.5 py-1'
                              >
                                <HandThumbUpIcon className='h-5 w-5 text-black' />
                                <span className='leading-none'>
                                  {review.like}
                                </span>
                              </button>
                              <button
                                onClick={() =>
                                  handleDislikeReview(
                                    review.id,
                                    review.product.id
                                  )
                                }
                                className='flex items-center gap-x-1 rounded-md border border-gray-300 px-1.5 py-1'
                              >
                                <HandThumbDownIcon className='h-5 w-5 text-black' />
                                <span className='leading-none'>
                                  {review.dislike}
                                </span>
                              </button>
                            </div>
                          </article>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </section>
    </main>
  );
};

export default ReviewList;
