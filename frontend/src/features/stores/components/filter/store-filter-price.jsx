import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import FieldText from '../../../ui/form/field-text';

const StoreFilterPrice = () => {
  return (
    <Disclosure>
      {({ open }) => (
        <div className={clsx(open && 'bg-gray-100')}>
          <Disclosure.Button className='flex w-full items-center justify-between p-4'>
            <div>Price Range</div>
            <ChevronRightIcon
              className={clsx(
                open && 'rotate-90',
                'h-5 w-5 text-gray-500 transition-transform duration-150 ease-in-out'
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel className='px-4 pb-4 text-gray-500'>
            <div className='flex gap-x-4'>
              <div>
                <FieldText
                  name='price_gt'
                  label='Min'
                  type='number'
                  placeholder='Mínimo'
                />
              </div>
              <div>
                <FieldText
                  name='price_lt'
                  label='Max'
                  type='number'
                  placeholder='Máximo'
                />
              </div>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default StoreFilterPrice;
