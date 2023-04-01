import { useCartContext } from '../../cart';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const CartHeader = ({ onClick }) => {
  const [, handlers] = useCartContext();

  const items = handlers.totalItems();

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
        {items > 0 && (
          <span
            className={clsx(
              items > 99 && 'translate-x-2',
              'absolute top-0 right-0 flex -translate-y-1 items-center justify-center rounded bg-red-600 px-1 text-sm font-medium lining-nums text-white'
            )}
          >
            {items < 100 ? items : '99+'}
          </span>
        )}
        <span className='sr-only'>items in cart, view bag</span>
      </button>
    </div>
  );
};

export default CartHeader;
