import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import CartUtils from '../../cart/cart.utils';
import { useGetCart } from '../../cart';

const CartHeader = ({ onClick }) => {
  const { data: itemsCart } = useGetCart();

  const quantity = CartUtils.getItemsQuantity(itemsCart);

  return (
    <div className='flow-root'>
      <button
        className='group relative flex items-center p-2'
        type='button'
        onClick={onClick}
      >
        <ShoppingCartIcon
          className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
          aria-hidden='true'
        />
        {quantity > 0 && (
          <span
            className={clsx(
              quantity > 99 && 'translate-x-2',
              'absolute top-0 right-0 flex -translate-y-1 items-center justify-center rounded bg-red-600 px-1 text-sm font-medium lining-nums text-white'
            )}
          >
            {quantity < 100 ? quantity : '99+'}
          </span>
        )}
        <span className='sr-only'>view cart</span>
      </button>
    </div>
  );
};

export default CartHeader;
