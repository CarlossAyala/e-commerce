import clsx from 'clsx';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Field } from 'formik';

const FilterOfficialStore = () => {
  return (
    <Disclosure>
      {({ open }) => (
        <div className={clsx(open && 'bg-gray-100')}>
          <Disclosure.Button className='flex w-full items-center justify-between p-4'>
            <div>Official Stores</div>
            <ChevronRightIcon
              className={clsx(
                open && 'rotate-90',
                'h-5 w-5 text-gray-500 transition-transform duration-150 ease-in-out'
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel className='px-4 pb-4 text-gray-500'>
            <div className='grid gap-2'>
              <label className='flex items-center gap-2'>
                <Field type='checkbox' name='official' />
                <span className='text-sm text-gray-600'>
                  Solo tiendas oficiales
                </span>
              </label>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default FilterOfficialStore;
