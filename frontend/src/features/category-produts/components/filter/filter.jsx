import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Formik, Form } from 'formik';
import { schema, CategoryProductAPI } from '../..';
import { useParams } from 'react-router-dom';
import FilterStore from './store/filter-store';
import FilterCondition from './condition/filter-condition';
import FilterOfficialStore from './official-store/filter-official-store';
import FilterPriceRange from './price-range/filter-price-range';
import QueryParams from '../../../utils/URL/query-params';
import { initial, withData } from '../../category-produts.formik';

const NAME_PARAMS = {
  STORES: 'stores',
  CONDITION: 'condition',
  OFFICIAL: 'official',
  PRICE_GT: 'price_gt',
  PRICE_LT: 'price_lt',
};

const Filter = ({ params, setParams }) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const [stores, setStores] = useState(null);

  const { cat } = useParams();

  const getStores = async () => {
    try {
      const data = await CategoryProductAPI.getCategoryStores(cat);

      // console.log('Product Filter getStores', data);

      setStores(data);
    } catch (error) {
      console.log('Filter getInfo', error);
    }
  };

  const getParams = () => {
    const stores = QueryParams.getArrayParam(params, NAME_PARAMS.STORES);
    const condition = QueryParams.getArrayParam(params, NAME_PARAMS.CONDITION);
    const official = QueryParams.getBooleanParam(params, NAME_PARAMS.OFFICIAL);
    const price_gt = QueryParams.getNumberParam(params, NAME_PARAMS.PRICE_GT);
    const price_lt = QueryParams.getNumberParam(params, NAME_PARAMS.PRICE_LT);

    setFilter({
      stores,
      condition,
      official,
      price_gt,
      price_lt,
    });
  };

  const clearSearchParams = () => {
    setParams((prev) => {
      prev.forEach((value, key) => {
        prev.delete(key);
      });
    });
  };

  const onSubmit = async (values) => {
    // console.log('values', values);
    setParams((prev) => {
      QueryParams.setArrayParam(prev, NAME_PARAMS.STORES, values.stores);
      QueryParams.setArrayParam(prev, NAME_PARAMS.CONDITION, values.condition);
      QueryParams.setBooleanParam(prev, NAME_PARAMS.OFFICIAL, values.official);
      QueryParams.setNumberParam(prev, NAME_PARAMS.PRICE_GT, values.price_gt);
      QueryParams.setNumberParam(prev, NAME_PARAMS.PRICE_LT, values.price_lt);

      return prev;
    });
  };

  useEffect(() => {
    getStores();
    getParams();
  }, []);

  if (!stores) return <h1>Loading</h1>;

  return (
    <div>
      <button
        type='button'
        className='inline-flex w-full justify-center rounded px-2 py-1 text-sm font-medium'
        onClick={() => setOpen(true)}
      >
        <div className='flex items-center gap-x-2'>
          <p className='font-light leading-none'>Filter</p>
          <FunnelIcon className='h-5 w-5' />
        </div>
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
                                Filter
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
                              <FilterStore stores={stores} />
                              <FilterCondition />
                              <FilterOfficialStore />
                              <FilterPriceRange />
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

export default Filter;
