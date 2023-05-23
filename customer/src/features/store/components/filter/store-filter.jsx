import { Dialog, Transition } from '@headlessui/react';
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Form, Formik } from 'formik';
import { Fragment, useEffect, useState } from 'react';
import StoreFilterProduct from './store-filter-product';
import { initial, schema, withData } from '../../stores.formik';
import StoreFilterCategories from './store-filter-categories';
import QueryParams from '../../../utils/URL/query-params';
import StoresAPI from '../../stores.api';
import { useParams, useSearchParams } from 'react-router-dom';
import StoreFilterStock from './store-filter-stock';
import StoreFilterPrice from './store-filter-price';

const PAGINATION_PARAMS = {
  LIMIT: 'limit',
  PAGE: 'page',
};
const PARAMS = {
  CATEGORIES: 'categories',
  CONDITION: 'condition',
  PRICE_GT: 'price_gt',
  PRICE_LT: 'price_lt',
  STOCK: 'stock',
};

const StoreFilter = () => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(initial);
  const [categories, setCategories] = useState(null);

  const { slug } = useParams();

  const [param, setParam] = useSearchParams();

  const getCategories = async () => {
    try {
      const data = await StoresAPI.getStoreCategories(slug);

      // console.log('Categories Store', data);

      const order = data.sort((fisrt, second) =>
        fisrt.name.localeCompare(second.name)
      );

      setCategories(order);
    } catch (error) {
      console.log('Store filter', error);
    }
  };

  const getParams = () => {
    const categories = QueryParams.getArrayParam(param, PARAMS.CATEGORIES);
    const condition = QueryParams.getArrayParam(param, PARAMS.CONDITION);
    const stock = QueryParams.getBooleanParam(param, PARAMS.STOCK, 'true');
    const price_gt = QueryParams.getNumberParam(param, PARAMS.PRICE_GT);
    const price_lt = QueryParams.getNumberParam(param, PARAMS.PRICE_LT);

    setFilter({
      categories,
      condition,
      stock,
      price_gt,
      price_lt,
    });
  };

  const onSubmit = (values) => {
    // console.log('values', values);
    setParam((prev) => {
      // Delete Pagination params
      for (const param of Object.values(PAGINATION_PARAMS)) {
        prev.delete(param);
      }

      QueryParams.setArrayParam(prev, PARAMS.CATEGORIES, values.categories);
      QueryParams.setArrayParam(prev, PARAMS.CONDITION, values.condition);
      QueryParams.setBooleanParam(prev, PARAMS.STOCK, values.stock);
      QueryParams.setNumberParam(prev, PARAMS.PRICE_GT, values.price_gt);
      QueryParams.setNumberParam(prev, PARAMS.PRICE_LT, values.price_lt);

      return prev;
    });

    setOpen(false);
  };

  const clearSearchParams = () => {
    setParam((prev) => {
      // Delete Filter params
      for (const param of Object.values(PARAMS)) {
        prev.delete(param);
      }

      // Delete Pagination params
      for (const param of Object.values(PAGINATION_PARAMS)) {
        prev.delete(param);
      }

      return prev;
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getParams();
  }, [param.toString()]);

  return (
    <div className='grow'>
      <button
        type='button'
        className='inline-flex w-full items-center justify-start py-3 pl-4 text-center font-medium text-indigo-500'
        onClick={() => setOpen(true)}
      >
        <AdjustmentsHorizontalIcon className='mr-2 h-5 w-5' />
        Filters
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter='ease-in-out duration-150'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-150'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500 sm:duration-700'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500 sm:duration-700'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel className='pointer-events-auto relative w-screen max-w-md'>
                    <Formik
                      initialValues={withData(filter)}
                      validationSchema={schema}
                      onSubmit={onSubmit}
                    >
                      {({ dirty, resetForm }) => {
                        // console.log(values)
                        return (
                          <Form className='ml-auto grid h-full max-w-md grid-rows-[auto_1fr_auto] bg-white'>
                            <div className='flex items-center justify-between border-b border-gray-200 px-4 py-3'>
                              <Dialog.Title className='text-lg leading-6 text-gray-900'>
                                Filters
                              </Dialog.Title>
                              <button
                                type='button'
                                className='-mr-2 rounded-md p-1 focus:ring-2 focus:ring-black'
                                onClick={() => setOpen(false)}
                              >
                                <span className='sr-only'>Close panel</span>
                                <XMarkIcon
                                  className='h-6 w-6'
                                  aria-hidden='true'
                                />
                              </button>
                            </div>
                            <div className='overflow-y-auto'>
                              <StoreFilterCategories categories={categories} />
                              <StoreFilterProduct />
                              <StoreFilterStock />
                              <StoreFilterPrice />
                            </div>
                            <div className='flex items-stretch'>
                              <button
                                type='button'
                                className='inline-flex h-16 grow bg-zinc-700 px-4 py-2 text-left align-baseline font-light text-white'
                                onClick={() => {
                                  resetForm({
                                    values: initial,
                                  });
                                  clearSearchParams();
                                  setOpen(false);
                                }}
                              >
                                Reset filters
                              </button>
                              <button
                                type='submit'
                                className='inline-flex h-16 grow bg-indigo-500 px-4 py-2 text-left align-baseline font-light text-white disabled:cursor-not-allowed disabled:bg-zinc-500/50 disabled:text-zinc-500'
                                disabled={!dirty}
                              >
                                Apply filters
                              </button>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default StoreFilter;
