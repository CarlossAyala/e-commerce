import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ArrowPathIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import {
  ArrowLongUpIcon,
  ArrowLongDownIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';

const PARAMS = {
  ORDER_BY: 'order_by',
  ORDER_DIR: 'order_dir',
};

const options = [
  {
    label: 'Best Sellers',
    by: 'sold',
    dir: 'DESC',
    Icon: ArrowTrendingUpIcon,
  },
  {
    label: 'Higher price',
    by: 'price',
    dir: 'DESC',
    Icon: ArrowLongUpIcon,
  },
  {
    label: 'Lower price',
    by: 'price',
    dir: 'ASC',
    Icon: ArrowLongDownIcon,
  },
];

const StoreOrder = () => {
  const [param, setParam] = useSearchParams();

  const currentOrderParam = () => {
    const defaultOrder = 'sold:DESC';

    const by = param.get(PARAMS.ORDER_BY) || '';
    const dir = param.get(PARAMS.ORDER_DIR) || '';
    const current = `${by}:${dir}`;

    const validOptions = options.map((option) => `${option.by}:${option.dir}`);

    return validOptions.includes(current) ? current : defaultOrder;
  };

  const handleParam = (option) => {
    setParam((prev) => {
      prev.delete(PARAMS.ORDER_BY);
      prev.delete(PARAMS.ORDER_DIR);
      if (option.by !== 'sold') {
        prev.set(PARAMS.ORDER_BY, option.by);
        prev.set(PARAMS.ORDER_DIR, option.dir);
      }

      return prev;
    });
  };

  const resetParam = () => {
    setParam((prev) => {
      for (const param of Object.values(PARAMS)) {
        prev.delete(param);
      }
      return prev;
    });
  };

  const currentOrder = currentOrderParam();

  return (
    <Menu
      as='div'
      className='relative inline-block grow border-r border-gray-200'
    >
      <Menu.Button className='inline-flex w-full items-center justify-start py-3 pl-4 text-center font-medium text-indigo-500'>
        <ArrowsUpDownIcon className='mr-2 h-5 w-5' />
        Order
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute left-0 z-10 mt-2 ml-3 w-44 divide-y divide-gray-200 rounded border border-gray-200 bg-white shadow-md focus:outline-none'>
          <div className='p-1'>
            {options.map(({ Icon, ...rest }) => (
              <Menu.Item key={rest.label}>
                {({ active }) => (
                  <button
                    className={clsx(
                      'relative flex w-full items-center rounded p-2',
                      active && 'bg-indigo-100',
                      currentOrder === `${rest.by}:${rest.dir}` &&
                        'text-indigo-500'
                    )}
                    onClick={() => handleParam(rest)}
                  >
                    <Icon className='mr-2 h-5 w-5' aria-hidden='true' />
                    {rest.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
          <div className='p-1'>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={clsx(
                    'relative flex w-full items-center rounded p-2',
                    'disabled:cursor-not-allowed disabled:text-gray-400',
                    active && 'bg-indigo-100'
                  )}
                  disabled={currentOrder === 'sold:DESC'}
                  onClick={() => resetParam()}
                >
                  <ArrowPathIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                  Reset
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default StoreOrder;
