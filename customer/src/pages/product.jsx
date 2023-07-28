import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
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
import {
  questionInitial,
  questionSchema,
  useGetCustomerQAProduct,
  useGetProduct,
  useGetQAProduct,
  useSendQuestion,
} from '../features/product';
import { priceFormater } from '../utils/formater';
import { useAddToHistory } from '../features/history';
import {
  useAddBookmark,
  useGetBookmark,
  useRemoveBookmark,
} from '../features/bookmark';

const Product = () => {
  const [tabQA, setTabQA] = useState(0);
  const { id } = useParams();

  const product = useGetProduct(id);
  const QA = useGetQAProduct(id);
  const customerQA = useGetCustomerQAProduct(id);
  const sendQuestion = useSendQuestion();

  const bookmark = useGetBookmark(id);
  const addBookmark = useAddBookmark();
  const removeBookmark = useRemoveBookmark();

  const history = useAddToHistory();

  console.log('Product', product);
  console.log('QA', QA);
  console.log('CustomerQA', customerQA);
  console.log('Bookmark', bookmark);

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

  const bookmarkLoading =
    bookmark.isLoading || addBookmark.isLoading || removeBookmark.isLoading;

  useEffect(() => {
    if (product.isFetched && product.data) {
      history.mutate(id);
    }
  }, [product.data]);

  return (
    <main className='overflow-auto bg-white'>
      {product.isFetched && product.data ? (
        <section className='mt-4 px-4'>
          <h1 className='text-xl font-semibold'>{product.data.name}</h1>
          <div className='aspect-square w-full'>
            <img
              className='mx-auto object-cover'
              src='https://http2.mlstatic.com/D_NQ_NP_773243-MLA42453247573_072020-V.webp'
              alt='XD'
            />
          </div>
          <div className='my-2 flex flex-wrap items-center gap-2'>
            <span className='rounded-full bg-rose-200 px-3 py-1 text-sm leading-none text-rose-900'>
              {/* TODO: Add tags variety for each condition */}
              Condition:{' '}
              <span className='capitalize'>{product.data.condition}</span>
            </span>
            <span className='rounded-full bg-violet-200 px-3 py-1 text-sm leading-none text-violet-900'>
              Stock: {product.data.stock}
            </span>
            <span className='rounded-full bg-green-200 px-3 py-1 text-sm leading-none text-green-900'>
              Sold: {product.data.sold}
            </span>
          </div>
          <div>
            <p className='text-3xl'>{priceFormater(product.data.price)}</p>
          </div>
          <div className='mt-2'>
            <p className='text-sm font-semibold'>Description</p>
            <p className='text-sm text-gray-600'>{product.data.description}</p>
          </div>
          <div className='mt-3'>
            <p className='mb-1 text-sm font-semibold'>Quantity</p>
            <NumberInput
              id='cart-quantity'
              label='Quantity'
              max={+product.data.stock}
              min={1}
              value={1}
              hideLabel
            />
            <div className='mt-2 flex justify-between gap-x-2'>
              <Button kind='primary' size='md' className='grow'>
                Add to cart
              </Button>

              {bookmarkLoading ? (
                <IconButton
                  label='Loading bookmark'
                  size='md'
                  kind='secondary'
                  disabled={bookmarkLoading}
                >
                  <div className='animate-spin'>
                    <Renew size='20' />
                  </div>
                </IconButton>
              ) : null}

              {bookmark.isFetched && !bookmarkLoading && bookmark.data ? (
                <IconButton
                  label='Remove from bookmark'
                  size='md'
                  kind='secondary'
                  onClick={handleRemoveBookmark}
                  disabled={bookmarkLoading}
                >
                  <BookmarkFilled size='20' />
                </IconButton>
              ) : null}
              {bookmark.isFetched && !bookmarkLoading && !bookmark.data ? (
                <IconButton
                  label='Add from bookmark'
                  size='md'
                  kind='secondary'
                  onClick={handleAddBookmark}
                  disabled={bookmarkLoading}
                >
                  <BookmarkAdd size='20' />
                </IconButton>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
      <div className='my-6 h-0.5 bg-gray-200' />

      {product.isFetched && product.data && (
        <section className='px-4'>
          <h2 className='mb-2 text-xl font-semibold'>Store Information</h2>
          <Link to='#' target='_blank'>
            <div className='flex items-center'>
              <div className='h-12 w-12'>
                <img
                  className='h-full w-full object-cover'
                  src='https://http2.mlstatic.com/D_NQ_NP_773243-MLA42453247573_072020-V.webp'
                  alt={`Profile from ${product.data.store.name} Store`}
                />
              </div>
              <div className='ml-2 grow'>
                <h3 className='text-sm font-semibold'>
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

      <div className='my-6 h-0.5 bg-gray-200' />

      <section className=''>
        <h2 className='mb-4 px-4 text-xl font-semibold'>
          Questions and Answers
        </h2>

        <Tabs defaultSelectedIndex={tabQA} selectedIndex={tabQA}>
          <TabList aria-label='List of tabs' style={{ width: '100%' }}>
            <Tab onClick={() => setTabQA(0)}>All questions</Tab>
            <Tab onClick={() => setTabQA(1)}>Your questions</Tab>
            <Tab onClick={() => setTabQA(2)}>Ask</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {QA.isLoading && <span>Loading...</span>}
              {QA.isFetched && (
                <>
                  {QA.data?.count > 0 && (
                    <ul className='space-y-8'>
                      {/* TODO: Crear feature "ver mas / ver menos" */}
                      {QA.data.rows.map((question) => (
                        <li key={question.id}>
                          <p className='text-sm font-semibold leading-snug text-gray-900'>
                            {question.question}
                          </p>
                          <div className='mt-1 flex'>
                            <XAxis
                              size='16'
                              className='mx-1 shrink-0 text-gray-400'
                            />
                            <p className='text-sm leading-snug tracking-wide text-gray-500'>
                              {question.answer.answer}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {QA.data?.count === 0 && (
                    <div className='py-6'>
                      <h3 className='text-lg font-medium leading-tight text-gray-900'>
                        You have not asked any questions yet
                      </h3>
                      <p className='mb-2 text-sm text-gray-500'>
                        Make your first question
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

                  {QA.data?.count > 10 && (
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
              {customerQA.isLoading && <span>Loading...</span>}
              {customerQA.isFetched && (
                <>
                  {customerQA.data?.count > 0 && (
                    <ul className='space-y-8'>
                      {customerQA.data.rows.map((question) => {
                        const date = new Date(question.createdAt);
                        const [month, day, year] = [
                          date.getMonth(),
                          date.getDate(),
                          date.getFullYear(),
                        ];
                        const [hour, minutes, seconds] = [
                          date.getHours(),
                          date.getMinutes(),
                          date.getSeconds(),
                        ];

                        const asked = `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`;

                        return (
                          <li key={question.id}>
                            <div className='mb-1 flex flex-wrap items-center gap-2'>
                              <span className='text-xs text-gray-600'>
                                {asked}
                              </span>
                              {/* TODO: Mojorar esto? */}
                              {question.states === 'answered' ? (
                                <span className='rounded-full bg-green-200 px-2 py-0.5 text-xs leading-none text-green-900'>
                                  Status:{' '}
                                  <span className='capitalize'>
                                    {question.states}
                                  </span>
                                </span>
                              ) : question.states === 'queue' ? (
                                <span className='rounded-full bg-yellow-200 px-2 py-0.5 text-xs leading-none text-yellow-900'>
                                  Status:{' '}
                                  <span className='capitalize'>
                                    {question.states}
                                  </span>
                                </span>
                              ) : (
                                <span className='rounded-full bg-rose-200 px-2 py-0.5 text-xs leading-none text-rose-900'>
                                  Status:{' '}
                                  <span className='capitalize'>
                                    {question.states}
                                  </span>
                                </span>
                              )}
                            </div>
                            <p className='text-sm font-semibold leading-snug text-gray-900'>
                              {question.question}
                            </p>
                            {question.answer && (
                              <div className='mt-1 flex'>
                                <XAxis
                                  size='16'
                                  className='mx-1 shrink-0 text-gray-400'
                                />
                                {/* TODO: Crear feature "ver mas / ver menos" */}
                                <p className='text-sm leading-snug tracking-wide text-gray-500'>
                                  {question.answer.answer}
                                </p>
                              </div>
                            )}
                            {question.states === 'rejected' && (
                              <div className='mt-1 flex'>
                                <Error
                                  size='16'
                                  className='mr-1 shrink-0 text-gray-400'
                                />
                                <p className='text-sm leading-snug tracking-wide text-gray-500'>
                                  Your question has been rejected
                                </p>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {customerQA.data?.count === 0 && (
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

                  {customerQA.data?.count > 10 && (
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
                initialValues={questionInitial}
                validationSchema={questionSchema}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    const newQuestion = await sendQuestion.mutateAsync({
                      id,
                      values,
                    });
                    resetForm();
                    // Ir a "Your questions"
                    setTabQA(1);
                    console.log('New Question', newQuestion);
                  } catch (error) {
                    console.log('Product Ask', error);
                  }
                }}
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <Form>
                    <p className='mb-4 text-sm text-gray-900'>
                      Your question will be in <em>Queue</em> until the{' '}
                      <em>Seller</em> answers it or rejects it. The question
                      will be <em>Viewable</em> for everyone when the Seller
                      answers it.
                    </p>
                    <TextArea
                      id='question-text'
                      name='question'
                      labelText='What is your question?'
                      placeholder='Write your question here'
                      className='mb-4'
                      invalid={errors.question && touched.question}
                      invalidText={errors.question}
                      value={values.question}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={4}
                      cols={50}
                    />
                    <Button kind='primary' type='submit'>
                      Ask
                    </Button>
                  </Form>
                )}
              </Formik>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </section>

      <div className='my-6 h-0.5 bg-gray-200' />

      {/* TODO: Crear feature "Reviews"  */}
      <section className='px-4'>
        <h2 className='mb-2 text-xl font-semibold'>Reviews</h2>

        <p className='text-sm italic leading-snug tracking-wide text-gray-500'>
          Future feature
        </p>
      </section>

      <div className='my-6 h-0.5 bg-gray-200' />

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
