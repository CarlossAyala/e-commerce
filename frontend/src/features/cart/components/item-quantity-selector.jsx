import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import useDebounce from '../../utils/hooks/use-debounce';

const ItemQuantitySelector = ({ item, handlers }) => {
  const [unit, setUnit] = useState(item.quantity);

  const [min, max] = handlers.stateControlls(item, unit);

  const debouncedUnit = useDebounce(unit);

  useEffect(() => {
    handlers.updateQuantity(item.id, debouncedUnit);
  }, [debouncedUnit]);

  return (
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
  );
};

export default ItemQuantitySelector;
