import { Menu, Transition } from '@headlessui/react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Fragment } from 'react';

const NAME_PARAMS = {
  ORDER_BY: 'order_by',
  ORDER_DIR: 'order_dir',
};
const orderByOptions = [
  {
    label: 'Higher price',
    by: 'price',
    dir: 'DESC',
  },
  {
    label: 'Lower price',
    by: 'price',
    dir: 'ASC',
  },
  {
    label: 'Most Sold (default)',
    by: 'sold',
    dir: 'DESC',
  },
];

const SortBy = ({ params, setParams }) => {
  const currentOrderByParam = () => {
    const defaultOrderBy = 'sold:DESC';

    const by = params.get(NAME_PARAMS.ORDER_BY);
    const dir = params.get(NAME_PARAMS.ORDER_DIR);

    const validOptions = orderByOptions.map((option) => option.by);

    return validOptions.includes(by) ? `${by}:${dir}` : defaultOrderBy;
  };

  const currentParam = currentOrderByParam();

  const handleClick = (option) => {
    setParams((prev) => {
      prev.set(NAME_PARAMS.ORDER_BY, option.by);
      prev.set(NAME_PARAMS.ORDER_DIR, option.dir);
      return prev;
    });
  };

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button
          type='button'
          className='inline-flex w-full justify-center rounded px-2 py-1 text-sm font-medium'
        >
          <div className='flex items-center gap-x-2'>
            <p className='font-light leading-none'>Sort by</p>
            <AdjustmentsHorizontalIcon className='h-5 w-5' aria-hidden='true' />
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          {orderByOptions.map((option, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <button
                  className={clsx(
                    active && 'bg-gray-200',
                    currentParam === `${option.by}:${option.dir}` &&
                      'text-violet-600',
                    'flex w-full items-center p-2 text-sm'
                  )}
                  onClick={() => handleClick(option)}
                >
                  {option.label}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SortBy;
