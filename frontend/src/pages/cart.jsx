import { Link } from 'react-router-dom';
import * as ShoppingCart from '../features/cart';

const Cart = () => {
  const [items, handlers] = ShoppingCart.useContext();

  const [vis, hid, both] = handlers.subTotals();

  return (
    <main className='mx-auto w-full max-w-7xl'>
      <div className='relative mx-auto flex h-full max-w-md flex-col'>
        <h2 className='p-4 text-lg font-medium text-gray-900'>Shopping Cart</h2>

        {/* Main */}
        <div className='flex flex-col overflow-y-scroll'>
          <div className='flex-1 overflow-y-auto'>
            <div className='flow-root'>
              <ul
                role='list'
                className='grid divide-y divide-gray-200 border-t-2 border-slate-200'
              >
                {items?.length > 0 &&
                  items.map((item) => (
                    <ShoppingCart.Item
                      item={item}
                      handlers={handlers}
                      key={item.id}
                    />
                  ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='sticky bottom-0 mt-auto border-t-2 border-gray-200 bg-white px-4 py-4'>
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
          <div className='mt-6 mb-2 flex justify-center text-center text-sm text-gray-500'>
            <p>
              or{' '}
              <button
                type='button'
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                Continue Shopping
                <span aria-hidden='true'> &rarr;</span>
              </button>
            </p>
          </div>
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
