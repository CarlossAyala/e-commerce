import { Fragment, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useGetProfile } from '../auth';
import { Dialog, Transition } from '@headlessui/react';
import {
  CartItem,
  getQtyCart,
  getTotalsCart,
  useGetCart,
} from '../features/cart';
import { Button } from '@carbon/react';
import { useCreatePaymentIntent } from '../features/stripe/payment-intent';
import { useCheckout } from '../features/checkout';
import { priceFormatter } from '../utils/formatter';
import clsx from 'clsx';

const panelOptions = {
  cart: 'cart',
  switcher: 'switcher',
};

const switcherSections = [
  [
    {
      label: 'Purchases',
      to: '/order/list',
    },
    {
      label: 'Questions',
      to: '/customer/questions',
    },
    {
      label: 'Reviews',
      to: '/customer/opinions',
    },
  ],
  [
    {
      label: 'Account',
      to: '/account',
    },
  ],
  [
    {
      label: 'Sell on Fak-Ommerce',
      to: '/customer/sell',
    },
  ],
  [
    {
      label: 'Log out',
      to: '/customer/logout',
    },
  ],
];

const navigation = {
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
};

const Logo = () => {
  return (
    <Link to='/' className='h-full px-2'>
      <div className='flex h-12 flex-col justify-center text-black/90'>
        <p className='text-sm leading-none'>Fak-Ommerce</p>
        <p className='text-sm font-semibold leading-tight'>[Customer]</p>
      </div>
    </Link>
  );
};

export const MainLayout = () => {
  const [slideover, setSlideover] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [slideoverPanel, setSlideoverPanel] = useState('');

  const navigate = useNavigate();

  const { setPaymentIntent } = useCheckout();
  const createPaymentIntent = useCreatePaymentIntent();

  const customer = useGetProfile();
  const cart = useGetCart();

  const qtyItems = getQtyCart(cart.data);
  const [visibles, hiddens, both] = getTotalsCart(cart.data);

  const handleSlideoverPanel = (panel) => {
    setSlideoverPanel(panel);
    setSlideover(true);
  };

  const handleCheckout = async () => {
    try {
      const paymentIntent = await createPaymentIntent.mutateAsync();
      console.log('Payment Intent Created!', paymentIntent);

      setPaymentIntent(paymentIntent.id);
      navigate('/checkout/shipping');
    } catch (error) {
      console.log('<MainLayout />');
      console.log('handleCheckout', error);
    }
  };

  return (
    <div className='grid min-h-screen grid-rows-[auto_1fr]'>
      <header className='flex h-12 w-full items-center border-b border-black/10'>
        <button
          onClick={() => setSidebar(true)}
          className='flex h-full w-12 items-center justify-center'
        >
          <Bars3CenterLeftIcon className='h-5 w-5 text-gray-900' />
        </button>
        <Logo />
        <div className='flex h-full grow justify-end'>
          <button
            onClick={() => console.log('Search Icon Header')}
            className='flex h-full w-12 items-center justify-center'
          >
            <MagnifyingGlassIcon className='h-5 w-5 text-gray-700' />
          </button>
          <button
            onClick={() => handleSlideoverPanel(panelOptions.cart)}
            className='relative flex h-full w-12 items-center justify-center'
          >
            <ShoppingCartIcon className='h-5 w-5 text-gray-700' />
            {qtyItems > 0 && (
              <div
                className={clsx(
                  'absolute top-1 rounded-full bg-red-600',
                  qtyItems < 10 && 'right-1 px-1.5 py-1',
                  qtyItems >= 10 && qtyItems < 100
                    ? 'right-1 p-1'
                    : 'right-0 p-0.5 px-1'
                )}
              >
                <p className='text-xs font-semibold tabular-nums leading-none text-white'>
                  {qtyItems > 99 ? '+99' : qtyItems}
                </p>
              </div>
            )}
          </button>
          <button
            onClick={() => handleSlideoverPanel(panelOptions.switcher)}
            className='flex h-full w-12 items-center justify-center'
          >
            <Squares2X2Icon className='h-5 w-5 text-gray-700' />
          </button>
        </div>

        {/* Sidebar */}
        <Transition.Root show={sidebar} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-40 lg:hidden'
            onClose={setSidebar}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-50' />
            </Transition.Child>

            <div className='fixed inset-0 z-40 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative flex w-full max-w-xs flex-col overflow-y-auto bg-white shadow-xl'>
                  <div className='flex'>
                    <button
                      type='button'
                      className='relative inline-flex w-12 items-center justify-center rounded-md text-gray-600'
                      onClick={() => setSidebar(false)}
                    >
                      <span className='absolute -inset-0.5' />
                      <span className='sr-only'>Close menu</span>
                      <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                    </button>
                    <Logo />
                  </div>

                  {/* Links */}
                  <div className='border-t border-gray-200 py-2'>
                    {navigation.pages.map((page) => (
                      <Link
                        key={page.name}
                        to={page.href}
                        className='block px-4 py-2 font-semibold text-gray-900'
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>

                  <div className='border-t border-gray-200 py-2'>
                    <Link
                      to='/signin'
                      className='block px-4 py-2 font-semibold text-gray-900'
                    >
                      Sign in
                    </Link>
                    <Link
                      to='/signup'
                      className='block px-4 py-2 font-semibold text-gray-900'
                    >
                      Create account
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Slideover */}
        <Transition.Root
          show={slideover}
          as={Fragment}
          afterLeave={() => {
            setSlideover(false);
            setSlideoverPanel('');
          }}
        >
          <Dialog as='div' className='relative z-10' onClose={setSlideover}>
            <Transition.Child
              as={Fragment}
              enter='ease-in-out duration-500'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in-out duration-500'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-70 transition-opacity' />
            </Transition.Child>

            <div className='fixed inset-0 overflow-hidden'>
              <div className='absolute inset-0 overflow-hidden'>
                <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                  <Transition.Child
                    as={Fragment}
                    enter='transform transition ease-in-out duration-500 sm:duration-700'
                    enterFrom='translate-x-full'
                    enterTo='translate-x-0'
                    leave='transform transition ease-in-out duration-500 sm:duration-700'
                    leaveFrom='translate-x-0'
                    leaveTo='translate-x-full'
                  >
                    <Dialog.Panel className='pointer-events-auto relative w-screen max-w-md'>
                      <div className='flex h-full flex-col overflow-y-scroll bg-white'>
                        <div className='flex items-center justify-between border-b border-black/10 bg-neutral-50 p-4'>
                          <Dialog.Title className='text-base font-semibold leading-6 text-gray-900'>
                            {slideoverPanel === panelOptions.switcher
                              ? 'Switcher'
                              : 'Shopping Cart'}
                          </Dialog.Title>

                          <button
                            type='button'
                            className='rounded-md text-gray-800 hover:text-black focus:outline-none focus:ring-2 focus:ring-neutral-400'
                            onClick={() => setSlideover(false)}
                          >
                            <span className='sr-only'>Close panel</span>
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>

                        {slideoverPanel === panelOptions.switcher && (
                          <div className='relative flex-1 divide-y divide-black/10'>
                            {customer.isLoading ? (
                              <p>Loading...</p>
                            ) : (
                              <div className='flex items-center gap-x-2 px-4 py-3'>
                                {customer.isError && (
                                  <div>
                                    <p>Sign in / Sign up</p>
                                  </div>
                                )}

                                {customer.isSuccess && (
                                  <>
                                    <div className='h-14 w-14 shrink-0 overflow-hidden rounded-full'>
                                      <img
                                        className='h-full w-full object-cover'
                                        src='https://cdn.dribbble.com/users/6903298/avatars/small/350ff7d3d2a5470d9c9b1d8a05c823aa.png?1671623912'
                                        alt='Dribble Random User'
                                      />
                                    </div>
                                    <div>
                                      <p className='line-clamp-1 text-base font-semibold leading-normal text-gray-900'>
                                        {`${customer.data.name} ${customer.data.lastName}`}
                                      </p>
                                      <p className='line-clamp-1 text-sm font-medium leading-normal text-gray-600'>
                                        {customer.data.email}
                                      </p>
                                    </div>
                                  </>
                                )}
                              </div>
                            )}
                            {switcherSections.map((section, index) => (
                              <ul key={index} className='py-2'>
                                {section.map(({ label, to }) => (
                                  <li key={to}>
                                    <Link to={to} className='flex px-4 py-1.5'>
                                      <p className='text-base font-semibold leading-tight text-gray-900'>
                                        {label}
                                      </p>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            ))}
                          </div>
                        )}
                        {slideoverPanel === panelOptions.cart && (
                          <div className='flex flex-1 flex-col overflow-y-auto'>
                            {cart.isLoading ? (
                              <p>Loading...</p>
                            ) : (
                              <>
                                <ul className='space-y-6 p-4'>
                                  {cart.isSuccess &&
                                    cart.data?.length > 0 &&
                                    cart.data.map((item) => (
                                      <CartItem
                                        key={`${item.productId}-${item.quantity}`}
                                        item={item}
                                      />
                                    ))}
                                </ul>
                                <div className='sticky bottom-0 z-10 mt-auto w-full border-t border-black/20 bg-white p-4'>
                                  <div className='flex items-end justify-between text-gray-900'>
                                    <p className='text-sm'>Subtotal</p>
                                    <p className='font-semibold'>
                                      {priceFormatter(visibles)}
                                    </p>
                                  </div>
                                  {hiddens ? (
                                    <div className='mb-2'>
                                      <div className='flex items-end justify-between text-gray-900'>
                                        <p className='text-sm'>
                                          Subtotal hiddens
                                        </p>
                                        <p className='font-semibold'>
                                          {priceFormatter(hiddens)}
                                        </p>
                                      </div>
                                      <div className='flex items-end justify-between text-gray-900'>
                                        <p className='text-sm'>
                                          Subtotal w/hiddens
                                        </p>
                                        <p className='font-semibold'>
                                          {priceFormatter(both)}
                                        </p>
                                      </div>
                                    </div>
                                  ) : null}
                                  <p className='text-sm text-gray-500'>
                                    Shipping and taxes calculated at checkout.
                                  </p>
                                  <div className='mt-4 flex w-full '>
                                    <Button
                                      onClick={handleCheckout}
                                      style={{
                                        width: '100%',
                                        maxWidth: '100%',
                                      }}
                                    >
                                      Checkout
                                    </Button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </header>

      <Outlet />
    </div>
  );
};
