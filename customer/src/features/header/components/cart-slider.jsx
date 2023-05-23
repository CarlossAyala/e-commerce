import { Link } from 'react-router-dom';
import { CartItem, useGetCart } from '../../cart';
import CartUtils from '../../cart/cart.utils';

const CartSlider = ({ setOpen }) => {
  const { data: ItemsCart, isLoading, isFetching, isError } = useGetCart();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error!</h1>;
  if (isFetching) return <h1>Fetching...</h1>;

  const [vis, hid, both] = CartUtils.getSubTotal(ItemsCart);

  return (
    <div className='grid h-full grid-rows-[1fr_auto]'>
      {/* Main */}
      <div className='flex-1 overflow-y-auto'>
        <ul role='list' className='divide-y divide-gray-200'>
          {ItemsCart.length > 0 &&
            ItemsCart.map((item) => <CartItem item={item} key={item.id} />)}
        </ul>
      </div>

      {/* Footer Cart Sidebar */}
      <div className='mt-auto border-t border-gray-200 bg-white px-4 py-4'>
        <h2 className='text-lg text-gray-900'>Cart summary</h2>

        {/* Sub-total */}
        <div className='my-2 divide-y divide-gray-200'>
          <div className='flex items-center justify-between py-1.5 text-base font-medium'>
            <p className='text-sm text-slate-500/80'>Total visible</p>
            <p className='font-medium text-gray-400 '>{vis.format}</p>
          </div>
          {hid.value ? (
            <div className='flex items-center justify-between py-1.5 text-base font-medium'>
              <p className='text-sm text-slate-500/80'>Total hidden</p>
              <p className='font-medium text-gray-400 '>{hid.format}</p>
            </div>
          ) : null}
        </div>
        {/* Total */}
        <div>
          <div className='flex justify-between text-lg font-medium text-gray-900'>
            <p>Total</p>
            <p>{vis.format}</p>
          </div>
          {hid.value ? (
            <div className='flex justify-between font-light text-gray-900'>
              <p>Total + hiddens</p>
              <p>{both.format}</p>
            </div>
          ) : null}
        </div>
        <div className='mt-4'>
          <Link
            to='/cart'
            className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
            onClick={() => setOpen(false)}
          >
            Checkout
          </Link>
        </div>
        <div className='mt-6 mb-2 flex justify-center text-center text-sm text-gray-500'>
          <p>
            or{' '}
            <button
              type='button'
              className='font-medium text-indigo-600 hover:text-indigo-500'
              onClick={() => setOpen(false)}
            >
              Continue Shopping
              <span aria-hidden='true'> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
export default CartSlider;
