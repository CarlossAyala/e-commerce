import { Link } from 'react-router-dom';
import { CartItem, useGetCart } from '../features/cart';
import CartUtils from '../features/cart/cart.utils';

const Cart = () => {
  const { data: ItemsCart, isLoading, isError, isFetching } = useGetCart();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error!</h1>;
  if (isFetching) return <h1>Fetching</h1>;

  const [vis, hid, both] = CartUtils.getSubTotal(ItemsCart);

  // console.log(ItemsCart);

  return (
    <main className='mx-auto h-full w-full max-w-7xl'>
      <h2 className='p-4 text-lg font-medium text-gray-900'>Shopping Cart</h2>

      <div className='max-h-full overflow-y-auto'>
        <ul
          role='list'
          className='grid divide-y divide-gray-100 border-t border-gray-200'
        >
          {ItemsCart.length > 0 &&
            ItemsCart.map((item) => <CartItem item={item} key={item.id} />)}
        </ul>
      </div>

      {/* Footer */}
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
              <p>Total w/ hiddens</p>
              <p>{both.format}</p>
            </div>
          ) : null}
        </div>
        <div className='mt-4'>
          <Link
            to='#'
            className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
          >
            Checkout
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Cart;

{
  /* <nav className='mt-6'>
  <ul className='mt-2 space-y-3'>
    {navigations.map((nav) => (
      <li key={nav.label}>
        <Link
          className='group flex flex-col rounded-md border p-3 shadow'
          to={nav.to}
        >
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-gray-800 group-hover:text-blue-600'>
                {nav.label}
              </h3>
              <p className='text-sm text-gray-500'>{nav.description}</p>
            </div>
            <div>
              <ChevronRightIcon className='h-5 w-5 text-gray-500' />
            </div>
          </div>
        </Link>
      </li>
    ))}
  </ul>
</nav>; */
}
