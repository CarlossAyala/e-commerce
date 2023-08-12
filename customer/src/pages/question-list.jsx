import { Link } from 'react-router-dom';
import { useGetQAsCustomer } from '../features/question';
import { ddMMYYFormatter, priceFormatter } from '../utils/formatter';
import clsx from 'clsx';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon, MinusCircleIcon } from '@heroicons/react/24/outline';
import { XAxis } from '@carbon/icons-react';

// TODO: Add Pagination
const QuestionList = () => {
  const products = useGetQAsCustomer();
  console.log('QAs', products);

  return (
    <main className='flex w-full flex-col overflow-auto bg-white'>
      <section className='border-b border-gray-200 px-4 py-3'>
        <h1 className='text-base font-semibold leading-6 text-gray-900'>
          Question List
        </h1>
        <p className='mt-1 text-sm text-gray-600'>
          Here you will see a list of all the questions you have asked.
        </p>
      </section>

      <section className='p-4'>
        {products.isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <ol className='space-y-4'>
              {products.isSuccess &&
                products.data.rows.length > 0 &&
                products.data.rows.map((product) => (
                  <li
                    key={product.id}
                    className='overflow-hidden rounded-lg border border-black/10'
                  >
                    <Link
                      to={`/product/${product.id}/${product.slug}`}
                      className='flex gap-x-3 border-b border-black/10 p-2'
                    >
                      <div className='h-16 w-16 shrink-0 overflow-hidden rounded-md border border-gray-300 p-1'>
                        <img
                          className='h-full w-full object-contain'
                          src='https://http2.mlstatic.com/D_611826-MLA70608099348_072023-O.jpg'
                          alt='Testing img'
                        />
                      </div>
                      <div className='grow'>
                        <p className='line-clamp-1 text-sm font-semibold text-gray-900'>
                          {product.name}
                        </p>
                        <p
                          className={clsx(
                            'rounded-md text-sm font-semibold capitalize leading-snug',
                            product.condition === 'new' && 'text-green-700',
                            product.condition === 'used' && 'text-violet-700',
                            product.condition === 'reconditioned' &&
                              'text-blue-700'
                          )}
                        >
                          {product.condition}
                        </p>
                        <p className='line-clamp-1 text-sm font-medium text-gray-600'>
                          {priceFormatter(product.price)}
                        </p>
                      </div>
                    </Link>
                    <div>
                      <ol className='divide-y divide-black/10'>
                        {product.questions.map((question) => (
                          <li key={question.id}>
                            <Disclosure>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button
                                    className={clsx(
                                      'relative w-full px-2 py-3',
                                      open ? 'bg-gray-100' : 'bg-white'
                                    )}
                                  >
                                    <p className='text-left text-xs font-medium text-gray-600'>
                                      {ddMMYYFormatter(question.createdAt)}
                                    </p>
                                    <div className='flex justify-between gap-x-4'>
                                      <p
                                        className={clsx(
                                          'text-left text-sm font-medium text-gray-900',
                                          open
                                            ? 'line-clamp-none'
                                            : 'line-clamp-1'
                                        )}
                                      >
                                        {question.question}
                                      </p>
                                      <ChevronRightIcon
                                        className={clsx(
                                          'h-5 w-5 shrink-0',
                                          open
                                            ? 'rotate-90 transform text-gray-900'
                                            : 'text-gray-500'
                                        )}
                                      />
                                    </div>
                                    {question.answer?.answer && (
                                      <>
                                        <span className='absolute right-0 top-0 mr-1 mt-1 inline-flex h-2 w-2 animate-ping rounded-full bg-blue-400 opacity-75'></span>
                                        <span className='absolute right-0 top-0 mr-1 mt-1 inline-flex h-2 w-2 rounded-full bg-blue-500'></span>
                                      </>
                                    )}
                                    {question.states === 'rejected' && (
                                      <>
                                        <span className='absolute right-0 top-0 mr-1 mt-1 inline-flex h-2 w-2 animate-ping rounded-full bg-red-400 opacity-75'></span>
                                        <span className='absolute right-0 top-0 mr-1 mt-1 inline-flex h-2 w-2 rounded-full bg-red-500'></span>
                                      </>
                                    )}
                                  </Disclosure.Button>
                                  <Disclosure.Panel>
                                    <div className='px-2 pb-3 pt-2'>
                                      {question.answer?.answer && (
                                        <>
                                          <div className='ml-5'>
                                            <p className='text-left text-xs font-medium text-gray-600'>
                                              {ddMMYYFormatter(
                                                question.answer.createdAt
                                              )}
                                            </p>
                                          </div>
                                          <div className='flex'>
                                            <XAxis
                                              size='16'
                                              className='mr-1 shrink-0 text-gray-400'
                                            />
                                            <p className='mt-px grow text-left text-sm font-medium text-gray-600'>
                                              {question.answer.answer}
                                            </p>
                                          </div>
                                        </>
                                      )}

                                      {question.states === 'queue' && (
                                        <p className='text-sm font-medium italic text-gray-600'>
                                          No answer yet.
                                        </p>
                                      )}
                                      {question.states === 'rejected' && (
                                        <div className='flex items-center gap-x-1'>
                                          <MinusCircleIcon className='h-5 w-5 text-red-500' />
                                          <p className='text-sm font-medium leading-tight text-red-600'>
                                            Question rejected.
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        )}
      </section>
    </main>
  );
};

export default QuestionList;
