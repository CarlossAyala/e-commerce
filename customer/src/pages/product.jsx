import { useState } from 'react';
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
import { Bookmark, Error, XAxis } from '@carbon/icons-react';
import {
  questionInitial,
  questionSchema,
  useGetCustomerQAProduct,
  useGetProduct,
  useGetQAProduct,
  useSendQuestion,
} from '../features/product';
import { priceFormater } from '../utils/formater';

const Product = () => {
  const [tabQA, setTabQA] = useState(0);
  const { id } = useParams();

  const product = useGetProduct(id);
  const QA = useGetQAProduct(id);
  const customerQA = useGetCustomerQAProduct(id);
  const sendQuestion = useSendQuestion();

  console.log('Product', product);
  console.log('QA', QA);
  console.log('customerQA', customerQA);

  return (
    <main className='overflow-auto bg-white'>
      {product.isFetched && product.data ? (
        <section className='px-4 mt-4'>
          <h1 className='text-xl font-semibold'>{product.data.name}</h1>
          <div className='aspect-square w-full'>
            <img
              className='object-cover mx-auto'
              src='https://http2.mlstatic.com/D_NQ_NP_773243-MLA42453247573_072020-V.webp'
              alt='XD'
            />
          </div>
          <div className='flex items-center gap-2 my-2 flex-wrap'>
            <span className='px-3 bg-rose-200 leading-none py-1 text-rose-900 rounded-full text-sm'>
              {/* TODO: Add tags variety for each condition */}
              Condition:{' '}
              <span className='capitalize'>{product.data.condition}</span>
            </span>
            <span className='px-3 bg-violet-200 leading-none py-1 text-violet-900 rounded-full text-sm'>
              Stock: {product.data.stock}
            </span>
            <span className='px-3 bg-green-200 leading-none py-1 text-green-900 rounded-full text-sm'>
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
            <p className='text-sm font-semibold mb-1'>Quantity</p>
            <NumberInput
              id='cart-quantity'
              label='Quantity'
              max={+product.data.stock}
              min={1}
              value={1}
              hideLabel
            />
            <div className='flex justify-between gap-x-2 mt-2'>
              <Button kind='primary' size='md' className='grow'>
                Add to cart
              </Button>
              <IconButton label='Add to favorites' size='md' kind='secondary'>
                <Bookmark size='20' />
              </IconButton>
            </div>
          </div>
        </section>
      ) : null}
      <div className='h-0.5 my-6 bg-gray-200' />

      {product.isFetched && product.data && (
        <section className='px-4'>
          <h2 className='font-semibold text-xl mb-2'>Store Information</h2>
          <Link to='#' target='_blank'>
            <div className='flex items-center'>
              <div className='w-12 h-12'>
                <img
                  className='object-cover w-full h-full'
                  src='https://http2.mlstatic.com/D_NQ_NP_773243-MLA42453247573_072020-V.webp'
                  alt={`Profile from ${product.data.store.name} Store`}
                />
              </div>
              <div className='ml-2 grow'>
                <h3 className='text-sm font-semibold'>
                  {product.data.store.name}
                </h3>
                <span className='text-gray-600 text-sm'>
                  {product.data.store.official
                    ? 'Official Store'
                    : 'Non-Official Store'}
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      <div className='h-0.5 my-6 bg-gray-200' />

      <section className=''>
        <h2 className='px-4 font-semibold text-xl mb-4'>
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
                          <p className='text-sm text-gray-900 leading-snug font-semibold'>
                            {question.question}
                          </p>
                          <div className='flex mt-1'>
                            <XAxis
                              size='16'
                              className='mx-1 shrink-0 text-gray-400'
                            />
                            <p className='text-sm text-gray-500 leading-snug tracking-wide'>
                              {question.answer.answer}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {QA.data?.count === 0 && (
                    <div className='py-6'>
                      <h3 className='text-lg leading-tight font-medium text-gray-900'>
                        You have not asked any questions yet
                      </h3>
                      <p className='text-sm text-gray-500 mb-2'>
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
                      <p className='text-sm text-center text-indigo-500'>
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
                            <div className='flex items-center flex-wrap gap-2 mb-1'>
                              <span className='text-xs text-gray-600'>
                                {asked}
                              </span>
                              {/* TODO: Mojorar esto? */}
                              {question.states === 'answered' ? (
                                <span className='px-2 bg-green-200 leading-none py-0.5 text-green-900 rounded-full text-xs'>
                                  Status:{' '}
                                  <span className='capitalize'>
                                    {question.states}
                                  </span>
                                </span>
                              ) : question.states === 'queue' ? (
                                <span className='px-2 bg-yellow-200 leading-none py-0.5 text-yellow-900 rounded-full text-xs'>
                                  Status:{' '}
                                  <span className='capitalize'>
                                    {question.states}
                                  </span>
                                </span>
                              ) : (
                                <span className='px-2 bg-rose-200 leading-none py-0.5 text-rose-900 rounded-full text-xs'>
                                  Status:{' '}
                                  <span className='capitalize'>
                                    {question.states}
                                  </span>
                                </span>
                              )}
                            </div>
                            <p className='text-sm text-gray-900 leading-snug font-semibold'>
                              {question.question}
                            </p>
                            {question.answer && (
                              <div className='flex mt-1'>
                                <XAxis
                                  size='16'
                                  className='mx-1 shrink-0 text-gray-400'
                                />
                                {/* TODO: Crear feature "ver mas / ver menos" */}
                                <p className='text-sm text-gray-500 leading-snug tracking-wide'>
                                  {question.answer.answer}
                                </p>
                              </div>
                            )}
                            {question.states === 'rejected' && (
                              <div className='flex mt-1'>
                                <Error
                                  size='16'
                                  className='mr-1 shrink-0 text-gray-400'
                                />
                                <p className='text-sm text-gray-500 leading-snug tracking-wide'>
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
                      <h3 className='text-lg leading-tight font-medium text-gray-900'>
                        There are no questions yet
                      </h3>
                      <p className='text-sm text-gray-500 mb-2'>
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
                      <p className='text-sm text-center text-indigo-500'>
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
                    <p className='text-sm text-gray-900 mb-4'>
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

      <div className='h-0.5 my-6 bg-gray-200' />

      {/* TODO: Crear feature "Reviews"  */}
      <section className='px-4'>
        <h2 className='font-semibold text-xl mb-2'>Reviews</h2>

        <p className='text-sm text-gray-500 leading-snug tracking-wide italic'>
          Future feature
        </p>
      </section>

      <div className='h-0.5 my-6 bg-gray-200' />

      {/* TODO: Crear feature "Related Products"  */}
      <section className='px-4'>
        <h2 className='font-semibold text-xl mb-2'>Related Products</h2>

        <p className='text-sm text-gray-500 leading-snug tracking-wide italic'>
          Future feature
        </p>
      </section>
    </main>
  );
};

export default Product;
