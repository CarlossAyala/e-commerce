import { Fragment, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useGetProfile } from '../auth';

const panelOptions = {
  cart: 'cart',
  switcher: 'switcher',
};

const switcherSections = [
  [
    {
      label: 'Publications',
      to: '/product/list',
    },
    {
      label: 'Publish',
      to: '/product/publish',
    },
    {
      label: 'Product Questions',
      to: '/product/question/list',
    },
  ],
  [
    {
      label: 'Store',
      to: '/store',
    },
    {
      label: 'Create Store',
      to: '/store/new',
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
      label: 'Log out',
      to: '/logout',
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
        <p className='text-sm font-semibold leading-tight'>[Seller]</p>
      </div>
    </Link>
  );
};

export const MainLayout = () => {
  const [slideover, setSlideover] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [slideoverPanel, setSlideoverPanel] = useState('');

  const customer = useGetProfile();

  const handleSlideoverPanel = (panel) => {
    setSlideoverPanel(panel);
    setSlideover(true);
  };

  const hideSlideover = () => {
    setSlideoverPanel('');
    setSlideover(false);
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
            onClose={hideSlideover}
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
                        onClick={hideSlideover}
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
                                    <Link
                                      to={to}
                                      className='flex px-4 py-1.5'
                                      onClick={hideSlideover}
                                    >
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

export default MainLayout;
