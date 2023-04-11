import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Field } from 'formik';

const StoreFilterCategories = ({ categories }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div className={clsx(open && 'bg-gray-100')}>
          <Disclosure.Button className='flex w-full items-center justify-between p-4'>
            <div>Categories</div>
            <ChevronRightIcon
              className={clsx(
                open && 'rotate-90',
                'h-5 w-5 text-gray-500 transition-transform duration-150 ease-in-out'
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel className='px-4 pb-4 text-gray-500'>
            <div className='grid gap-2'>
              {!categories && (
                <p className='italic text-gray-400'>Loading...</p>
              )}
              {categories?.length &&
                categories.map((category) => (
                  <div key={category.id}>
                    <label className='flex items-center gap-2'>
                      <Field
                        type='checkbox'
                        name='categories'
                        value={category.slug}
                      />
                      <span className='text-sm capitalize text-gray-600'>
                        {category.name}
                      </span>
                    </label>
                  </div>
                ))}
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default StoreFilterCategories;
