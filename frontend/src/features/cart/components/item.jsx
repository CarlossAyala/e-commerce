import { useEffect, useState } from 'react';
import {
  BookmarkIcon,
  EyeIcon,
  EyeSlashIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Formater } from '../../utils/helpers';
import useDebounce from '../../utils/hooks/use-debounce';

const Item = ({ item, handlers }) => {
  const [unit, setUnit] = useState(item.quantity);

  const debouncedUnit = useDebounce(unit);

  const total = handlers.totalProduct(item);
  const [min, max] = handlers.stateControlls(item, unit);

  useEffect(() => {
    handlers.updateItem(item, debouncedUnit);
  }, [debouncedUnit]);

  return (
    <li className='grid grid-rows-[1fr_auto] shadow-sm'>
      <div className='flex py-3 px-4'>
        <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
          <img
            src={
              'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg'
            }
            alt={item.imageAlt}
            className='h-full w-full object-cover object-center'
          />
        </div>

        <div className='ml-4 flex flex-1 flex-col'>
          {/* Name */}
          <h3 className='line-clamp-1'>
            <a href={item.href}>{item.product.name}</a>
          </h3>
          {/* Details */}
          <div className='flex flex-col justify-between text-base font-normal text-gray-900'>
            <p className='text-sm text-gray-500'>
              Stock {item.product.stock} u.
            </p>
            <p className='text-sm text-gray-500'>
              U/P {Formater.price(item.product.price)}
            </p>
          </div>
          <div className='flex flex-1 items-end justify-between text-sm'>
            <p className='text-base font-medium'>{total}</p>
          </div>
        </div>
      </div>

      {/* Units controllers */}
      <div className='flex items-center justify-between border-t border-gray-200 py-3 px-4'>
        <div className='flex items-center overflow-hidden rounded border border-gray-200'>
          <button
            type='button'
            className='bg-indigo-50 p-1.5 font-medium text-indigo-600 hover:text-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-500'
            disabled={min}
            onClick={() => setUnit((current) => --current)}
          >
            <MinusIcon className='h-5 w-5' />
          </button>
          <span className='px-3'>{unit}</span>
          <button
            type='button'
            className='bg-indigo-50 p-1.5 font-medium text-indigo-600 hover:text-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-500'
            disabled={max}
            onClick={() => setUnit((current) => ++current)}
          >
            <PlusIcon className='h-5 w-5' />
          </button>
        </div>

        {/* Visible Controller */}
        <div className='inline-block'>
          <button
            type='button'
            className={clsx(
              item.visible ? 'bg-white' : 'bg-indigo-500',
              'rounded border border-gray-200 p-2 font-medium'
            )}
            onClick={() => handlers.visibleToggle(item)}
          >
            {item.visible ? (
              <EyeIcon className='h-5 w-5 text-indigo-600' />
            ) : (
              <EyeSlashIcon className='h-5 w-5 text-white' />
            )}
          </button>
        </div>

        {/* Favorite and Delete */}
        <div className='flex items-center gap-x-2'>
          <button
            type='button'
            className='rounded border border-gray-200 p-2 font-medium text-indigo-600 hover:text-indigo-500'
          >
            <BookmarkIcon className='h-5 w-5' />
          </button>
          <button
            type='button'
            className='rounded border border-gray-200 p-2 font-medium text-indigo-600 hover:text-indigo-500'
          >
            <TrashIcon className='h-5 w-5' />
          </button>
        </div>
      </div>
    </li>
  );
};

export default Item;
