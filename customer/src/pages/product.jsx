import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  StarIcon as StarOutline,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import {
  NumberInput,
  Button,
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TextArea,
} from '@carbon/react';
import {
  BookmarkAdd,
  BookmarkFilled,
  Error,
  XAxis,
  Renew,
} from '@carbon/icons-react';
import { useGetProduct } from '../features/product';
import { getTimeAgo, priceFormater } from '../utils/formater';
import { useAddToHistory } from '../features/history';
import {
  useAddBookmark,
  useGetBookmark,
  useRemoveBookmark,
} from '../features/bookmark';
import { useAddToCart } from '../features/cart';
import {
  useCreateQuestion,
  useGetCustomerQAs,
  useGetProductQAs,
} from '../features/question';
import {
  createQuestionInitial,
  createQuestionSchema,
} from '../features/question';
import clsx from 'clsx';
import { splitFloat } from '../utils/numbers';
import {
  useDislikeReview,
  useGetReviews,
  useGetReviewsStats,
  useLikeReview,
} from '../features/review';

const AvarageStar = ({ rate, index }) => {
  const [int, float] = splitFloat(rate);

  let width;
  if (rate >= index) width = '100%';
  else if (rate < index && int === index - 1) width = `${float * 100}%`;
  else width = '0%';

  return (
    <div className='relative h-4 w-4'>
      <StarOutline className='absolute h-4 w-4 text-indigo-500' />
      <div className='absolute overflow-hidden' style={{ width }}>
        <StarSolid className='h-4 w-4 text-indigo-500' />
      </div>
    </div>
  );
};

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

const Product = () => {
  const [tabQA, setTabQA] = useState(0);
  const quantity = useRef(1);

  const { id } = useParams();

  const product = useGetProduct(id);
  const productQAs = useGetProductQAs(id);
  const customerQAs = useGetCustomerQAs(id);
  const createQuestion = useCreateQuestion();

  const bookmark = useGetBookmark(id);
  const addBookmark = useAddBookmark();
  const removeBookmark = useRemoveBookmark();

  const addToCart = useAddToCart();

  const history = useAddToHistory();

  const reviews = useGetReviews(id);
  const reviewsStats = useGetReviewsStats(id);
  const likeReview = useLikeReview();
  const dislikeReview = useDislikeReview();
  console.log('Reviews', reviews);
  console.log('Reviews Stats', reviewsStats);

  // console.log('Product', product);
  // console.log('QA', QA);
  // console.log('CustomerQA', customerQA);
  // console.log('Bookmark', bookmark);

  const handleAddToCart = () => {
    try {
      addToCart.mutateAsync([id, quantity.current]);
    } catch (error) {
      console.log('<Product />');
      console.log('handleAddToCart', error);
    }
  };

  const handleAddBookmark = async () => {
    try {
      await addBookmark.mutateAsync(id);
    } catch (error) {
      console.log('<Product />');
      console.log('handleAddBookmark', error);
    }
  };

  const handleRemoveBookmark = async () => {
    try {
      await removeBookmark.mutateAsync(id);
    } catch (error) {
      console.log('<Product />');
      console.log('handleRemoveBookmark', error);
    }
  };

  const handleCreateQuestion = async (values, { resetForm }) => {
    try {
      await createQuestion.mutateAsync([id, values]);
      resetForm();
      // Ir a "Your questions"
      setTabQA(1);
    } catch (error) {
      console.log('<Product />');
      console.log('handleCreateQuestion', error);
    }
  };

  const handleLikeReview = async (reviewId) => {
    try {
      await likeReview.mutateAsync([reviewId, id]);
    } catch (error) {
      console.log('<Product />');
      console.log('handleLikeReview', error);
    }
  };

  const handleDislikeReview = async (reviewId) => {
    try {
      await dislikeReview.mutateAsync([reviewId, id]);
    } catch (error) {
      console.log('<Product />');
      console.log('handleDislikeReview', error);
    }
  };

  useEffect(() => {
    if (product.isFetched && product.data) {
      history.mutate(id);
    }
  }, [product.data]);

  return (
    <main className='w-full space-y-2 bg-white'>
      {product.isFetched && product.data ? (
        <section className='p-4'>
          <h1 className='text-xl font-semibold'>{product.data.name}</h1>
          <div className='aspect-square w-full'>
            <img
              className='mx-auto object-cover'
              src='https://http2.mlstatic.com/D_NQ_NP_773243-MLA42453247573_072020-V.webp'
              alt='XD'
            />
          </div>
          <div>
            <p className='text-3xl'>{priceFormater(product.data.price)}</p>
          </div>

          <div className='mt-2 space-y-3'>
            <div>
              <p className='text-sm font-semibold'>Description</p>
              <p className='text-base leading-tight text-gray-600'>
                {product.data.description}
              </p>
            </div>
            <div className='flex gap-x-4'>
              <div className='grow'>
                <p className='text-sm font-semibold leading-none'>Condition</p>
                <p className='text-base capitalize text-gray-700'>
                  {product.data.condition}
                </p>
              </div>
              <div className='grow'>
                <p className='text-sm font-semibold leading-none'>Stock</p>
                <p className='text-base text-gray-700'>{product.data.stock}</p>
              </div>
              <div className='grow'>
                <p className='text-sm font-semibold leading-none'>Sold</p>
                <p className='text-base text-gray-700'>{product.data.sold}</p>
              </div>
            </div>
            <div>
              <p className='mb-1 text-sm font-semibold'>Quantity</p>
              <NumberInput
                id='cart-quantity'
                label='Quantity'
                max={+product.data.stock}
                min={1}
                onChange={(event, { value }) => (quantity.current = value)}
                value={1}
                hideLabel
              />
              <div className='mt-2 flex justify-between gap-x-2'>
                <Button
                  kind='primary'
                  size='md'
                  className='grow'
                  onClick={handleAddToCart}
                >
                  Add to cart
                </Button>

                {bookmark.isLoading ? (
                  <IconButton
                    label='Loading bookmark'
                    size='md'
                    kind='secondary'
                    disabled={bookmark.isLoading}
                  >
                    <div className='animate-spin'>
                      <Renew size='20' />
                    </div>
                  </IconButton>
                ) : null}

                {bookmark.isFetched && bookmark.data ? (
                  <IconButton
                    label='Remove from bookmark'
                    size='md'
                    kind='secondary'
                    onClick={handleRemoveBookmark}
                    disabled={bookmark.isLoading}
                  >
                    <BookmarkFilled size='20' />
                  </IconButton>
                ) : null}
                {bookmark.isFetched && !bookmark.data ? (
                  <IconButton
                    label='Add from bookmark'
                    size='md'
                    kind='secondary'
                    onClick={handleAddBookmark}
                    disabled={bookmark.isLoading}
                  >
                    <BookmarkAdd size='20' />
                  </IconButton>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {product.isFetched && product.data && (
        <section className='p-4'>
          <h2 className='text-xl font-semibold'>Store Information</h2>
          <Link to='#' className='mt-2 block'>
            <div className='flex items-center'>
              <div className='h-12 w-12'>
                <img
                  className='h-full w-full object-cover'
                  src='https://http2.mlstatic.com/D_NQ_NP_773243-MLA42453247573_072020-V.webp'
                  alt={`${product.data.store.name} profile`}
                />
              </div>
              <div className='ml-2 grow'>
                <h3 className='text-sm font-semibold leading-none'>
                  {product.data.store.name}
                </h3>
                <span className='text-sm text-gray-600'>
                  {product.data.store.official
                    ? 'Official Store'
                    : 'Non-Official Store'}
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {productQAs.isFetched && (
        <section className='pt-4'>
          <h2 className='px-4 text-xl font-semibold'>Questions and Answers</h2>

          <Tabs defaultSelectedIndex={tabQA} selectedIndex={tabQA}>
            <TabList aria-label='List of tabs' style={{ width: '100%' }}>
              <Tab onClick={() => setTabQA(0)}>Questions</Tab>
              <Tab onClick={() => setTabQA(1)}>Your questions</Tab>
              <Tab onClick={() => setTabQA(2)}>Ask</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {productQAs.isLoading && <span>Loading...</span>}
                {productQAs.isFetched && (
                  <>
                    {productQAs.data?.rows.length > 0 && (
                      <ul className='space-y-6'>
                        {/* TODO: Crear feature "ver mas / ver menos" */}
                        {productQAs.data.rows.map((question) => (
                          <li key={question.id}>
                            <p className='text-sm font-medium leading-snug text-gray-900'>
                              {question.question}
                            </p>
                            <div className='mt-1 flex'>
                              <XAxis
                                size='16'
                                className='mr-1 shrink-0 text-gray-400'
                              />
                              <p className='mt-0.5 text-sm leading-snug text-gray-600'>
                                {question.answer.answer}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}

                    {productQAs.data?.rows.length === 0 && (
                      <div className='py-2'>
                        <p className='text-lg font-medium leading-none text-gray-900'>
                          There are no questions yet
                        </p>
                        <p className='mb-2 text-sm text-gray-600'>
                          Make the first one!
                        </p>
                        <Button
                          size='md'
                          kind='primary'
                          onClick={() => setTabQA(2)}
                        >
                          Ask
                        </Button>
                      </div>
                    )}

                    {productQAs.data?.count > 10 && (
                      // TODO: Crear modal para ver más
                      <div className='pt-2'>
                        <p className='text-center text-sm text-indigo-500'>
                          Cargar más{' '}
                          <span className='italic'>(TODO: Crear feature)</span>
                        </p>
                      </div>
                    )}
                  </>
                )}
              </TabPanel>
              <TabPanel>
                {customerQAs.isLoading && <span>Loading...</span>}
                {customerQAs.isFetched && (
                  <>
                    {customerQAs.data?.count > 0 && (
                      <ul className='space-y-6'>
                        {customerQAs.data.rows.map((question) => (
                          <li key={question.id}>
                            <div className='mb-1 flex flex-wrap items-center gap-2'>
                              <span className='text-xs text-gray-600'>
                                {getTimeAgo(question.createdAt)}
                              </span>
                              <span
                                className={clsx(
                                  'rounded-md px-2 py-1 text-xs font-semibold capitalize leading-none',
                                  question.states === 'answered' &&
                                    'bg-green-200 text-green-900',
                                  question.states === 'queue' &&
                                    'bg-yellow-200 text-yellow-900',
                                  question.states === 'rejected' &&
                                    'bg-rose-200 text-rose-900'
                                )}
                              >
                                {question.states}
                              </span>
                            </div>
                            <p className='text-sm font-medium leading-snug text-gray-900'>
                              {question.question}
                            </p>
                            {question.answer && (
                              <div className='mt-1 flex'>
                                <XAxis
                                  size='16'
                                  className='mr-1 shrink-0 text-gray-400'
                                />
                                <p className='mt-0.5 text-sm leading-snug tracking-wide text-gray-600'>
                                  {question.answer.answer}
                                </p>
                              </div>
                            )}
                            {question.states === 'rejected' && (
                              <div className='mt-1 flex items-center'>
                                <Error
                                  size='16'
                                  className='mr-1 shrink-0 text-gray-400'
                                />
                                <p className='text-sm leading-none text-gray-600'>
                                  This question has been rejected
                                </p>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}

                    {customerQAs.data?.count === 0 && (
                      <div className='py-6'>
                        <h3 className='text-lg font-medium leading-tight text-gray-900'>
                          There are no questions yet
                        </h3>
                        <p className='mb-2 text-sm text-gray-500'>
                          Be the first at ask
                        </p>
                        <Button
                          size='md'
                          kind='primary'
                          onClick={() => setTabQA(2)}
                        >
                          Make a question
                        </Button>
                      </div>
                    )}

                    {customerQAs.data?.count > 10 && (
                      // TODO: Crear modal para ver más
                      <div className='pt-2'>
                        <p className='text-center text-sm text-indigo-500'>
                          Cargar más{' '}
                          <span className='italic'>(TODO: Crear feature)</span>
                        </p>
                      </div>
                    )}
                  </>
                )}
              </TabPanel>
              <TabPanel>
                <Formik
                  initialValues={createQuestionInitial}
                  validationSchema={createQuestionSchema}
                  onSubmit={handleCreateQuestion}
                >
                  {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form className='space-y-4'>
                      <p className='text-sm text-gray-900'>
                        Your question will be in{' '}
                        <em className='font-bold'>Queue</em> until the{' '}
                        <em className='font-bold'>Seller</em> answers it or
                        rejects it. The question will be{' '}
                        <em className='font-bold'>Viewable</em> for everyone
                        when the <em className='font-bold'>Seller</em> answers
                        it.
                      </p>
                      <div>
                        <TextArea
                          id='question-text'
                          name='question'
                          labelText='What is your question?'
                          placeholder='Write your question here'
                          invalid={errors.question && touched.question}
                          invalidText={errors.question}
                          value={values.question}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className='mt-4'>
                        <Button kind='primary' type='submit'>
                          Ask
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </section>
      )}

      <section className='p-4'>
        <h2 className='text-xl font-semibold'>Reviews</h2>

        {reviewsStats.isFetched && reviewsStats.data && (
          <div className='mt-1 flex gap-x-4'>
            <div>
              <p className='text-4xl font-medium'>
                {reviewsStats.data.avarage}
              </p>

              <div className='flex items-center gap-x-1'>
                {reviewsStats.data.reviews.map((review, index) => (
                  <AvarageStar
                    key={review.rating}
                    rate={reviewsStats.data.avarage}
                    index={++index}
                  />
                ))}
              </div>
              <div className='mt-1'>
                <p className='text-sm leading-none text-gray-800'>
                  {reviewsStats.data.total}
                </p>
                <p className='text-sm leading-tight text-gray-500'>Reviews</p>
              </div>
            </div>
            <div className='grow'>
              <ol className='w-full space-y-1'>
                {reviewsStats.data.reviews.map((review) => (
                  <li key={review.rating} className='flex items-center gap-x-2'>
                    <div className='relative h-1.5 w-full grow rounded-r-full'>
                      <span className='absolute left-0 top-0 h-1.5 w-full rounded-r-full bg-black/20'></span>
                      <span
                        style={{
                          width: review.percentage + '%',
                        }}
                        className='absolute left-0 top-0 h-1.5 rounded-r-full bg-indigo-500'
                      ></span>
                    </div>
                    <div className='flex items-center gap-x-1'>
                      <span className='text-sm leading-none text-gray-500'>
                        {review.rating}
                      </span>
                      <StarSolid className='h-4 w-4 text-gray-300' />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {reviews.isFetched && reviews.data?.rows.length === 0 && (
          <div className='mt-6'>
            <p className='text-sm leading-none text-gray-800'>
              There are no reviews yet {':('}
            </p>
          </div>
        )}
        {reviews.isFetched && reviews.data?.rows.length > 0 && (
          <div className='mt-10 space-y-6'>
            {reviews.data?.rows.length > 0 &&
              reviews.data.rows.map((review) => (
                <article key={review.id}>
                  <div className='flex items-center justify-between'>
                    <ReviewStars rating={review.rating} />
                    <span className='text-sm leading-tight text-gray-600'>
                      {getTimeAgo(review.createdAt)}
                    </span>
                  </div>
                  <div className='mb-2 mt-1'>
                    <p className='text-sm leading-tight text-black'>
                      {review.comment}
                    </p>
                  </div>
                  <div className='flex items-center gap-x-4'>
                    <button
                      onClick={() => handleLikeReview(review.id)}
                      className='flex items-center gap-x-1 rounded-md border border-gray-300 px-1.5 py-1'
                    >
                      <HandThumbUpIcon className='h-5 w-5 text-black' />
                      <span className='leading-none'>{review.like}</span>
                    </button>
                    <button
                      onClick={() => handleDislikeReview(review.id)}
                      className='flex items-center gap-x-1 rounded-md border border-gray-300 px-1.5 py-1'
                    >
                      <HandThumbDownIcon className='h-5 w-5 text-black' />
                      <span className='leading-none'>{review.dislike}</span>
                    </button>
                  </div>
                </article>
              ))}
          </div>
        )}
      </section>

      {/* TODO: Crear feature "Related Products"  */}
      <section className='px-4'>
        <h2 className='mb-2 text-xl font-semibold'>Related Products</h2>

        <p className='text-sm italic leading-snug tracking-wide text-gray-500'>
          Future feature
        </p>
      </section>
    </main>
  );
};

export default Product;
