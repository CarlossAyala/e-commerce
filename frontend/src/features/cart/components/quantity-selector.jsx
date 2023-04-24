import { useEffect, useState } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import CartUtils from '../cart.utils';
import { useUpdateQuantity } from '../cart.queries';
import useDebounce from '../../utils/hooks/use-debounce';

const QuantitySelector = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const [min, max] = CartUtils.buttonControlls(quantity, item.product.stock);

  const debouncedQuantity = useDebounce(quantity);

  const updateQuantity = useUpdateQuantity();

  useEffect(() => {
    if (item.quantity === debouncedQuantity) return;

    const productId = item.id;
    const quantity = debouncedQuantity;

    updateQuantity.mutate({ productId, quantity });
  }, [debouncedQuantity]);

  return (
    <div className='flex items-center overflow-hidden rounded border border-gray-200'>
      <button
        type='button'
        className='bg-indigo-50 p-1.5 font-medium text-indigo-600 hover:text-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-500'
        disabled={min}
        onClick={() => setQuantity((previus) => --previus)}
      >
        <MinusIcon className='h-5 w-5' />
      </button>
      <span className='px-3'>{quantity}</span>
      <button
        type='button'
        className='bg-indigo-50 p-1.5 font-medium text-indigo-600 hover:text-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-500'
        disabled={max}
        onClick={() => setQuantity((previus) => ++previus)}
      >
        <PlusIcon className='h-5 w-5' />
      </button>
    </div>
  );
};

export default QuantitySelector;
