import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useCartContext } from '../../../cart/cart.provider';

const ProductAddCart = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const [, handlers] = useCartContext();

  return (
    <div className='grid grid-cols-2 gap-5'>
      <div className='flex-2 flex h-10 items-center rounded-md border border-gray-200'>
        <button
          type='button'
          className='h-10 rounded-l-md bg-slate-200 p-2 text-indigo-600 disabled:cursor-not-allowed disabled:text-gray-600 disabled:opacity-50'
          onClick={() => setQuantity((curr) => --curr)}
          disabled={quantity === 1}
        >
          <MinusIcon className='h-5 w-5' />
        </button>
        <div className='w-full px-4 text-center text-xl'>
          <span>{quantity}</span>
        </div>
        <button
          type='button'
          className='h-10 rounded-r-md bg-slate-200 p-2 text-indigo-600 disabled:cursor-not-allowed disabled:text-gray-600 disabled:opacity-50'
          onClick={() => setQuantity((curr) => ++curr)}
          disabled={quantity === product.stock}
        >
          <PlusIcon className='h-5 w-5' />
        </button>
      </div>
      <button
        className='block h-10 rounded-md bg-indigo-600 p-2 text-white'
        type='button'
        onClick={() => handlers.addItem(product.id, quantity)}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductAddCart;
