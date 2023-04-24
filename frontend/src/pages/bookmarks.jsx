import { useEffect, Fragment } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import {
  useClearBookmark,
  useGetBookmarks,
  useRemoveBookmark,
} from '../features/bookmarks';
import { useAddToCart } from '../features/cart';
import clsx from 'clsx';
import {
  ArrowPathIcon,
  EllipsisVerticalIcon,
  ShoppingCartIcon as OutlineCartIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ShoppingCartIcon as SolidCartIcon } from '@heroicons/react/24/solid';
import { Pagination } from '../features/ui';
import { Formater, GroupBy } from '../features/utils/helpers';

const format = (string_date) => {
  const date = new Date(string_date);
  const now = new Date();

  if (now.getFullYear() === date.getFullYear()) {
    return new Intl.DateTimeFormat('es-AR', {
      month: 'long',
    }).format(now);
  } else {
    return new Intl.DateTimeFormat('es-AR', {
      month: 'long',
      year: 'numeric',
    }).format(date);
  }
};

const Bookmarks = () => {
  const [param] = useSearchParams();

  const {
    data: bookmarks,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetBookmarks(param);

  const removeBookmark = useRemoveBookmark();
  const clearBookmarks = useClearBookmark();

  const addToCart = useAddToCart();

  useEffect(() => {
    refetch();
  }, [param.toString()]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error: {error.message}</h1>;

  // console.log('bookmarks', bookmarks);

  const agruped = bookmarks.rows.length
    ? GroupBy.monthYear(bookmarks.rows, 'createdAt')
    : [];

  // console.log('agruped', agruped);

  return (
    <main className='mx-auto flex w-full max-w-7xl flex-col'>
      <section className='flex items-start justify-between gap-x-2 border-b border-gray-100 p-4'>
        <div>
          <h1 className='text-lg font-medium leading-6 text-gray-900'>
            Bookmarks
          </h1>
          <p className='text-sm text-gray-500'>
            Lista de los productos que marcaste como favoritos.
          </p>
        </div>
        <div className='text-right'>
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button className='rounded-md border border-gray-300 p-2 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-black '>
                <EllipsisVerticalIcon
                  className='h-5 w-5 text-black'
                  aria-hidden='true'
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md border border-gray-100 bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='px-1 py-1 '>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={clsx(
                          active ? 'bg-violet-500 text-white' : 'text-gray-900',
                          'group flex w-full items-center rounded-md p-2 text-sm'
                        )}
                        onClick={() => clearBookmarks.mutate()}
                      >
                        <ArrowPathIcon
                          className={clsx(
                            active ? 'text-white' : 'text-violet-500',
                            'mr-2 h-5 w-5'
                          )}
                          aria-hidden='true'
                        />
                        Clear Bookmarks
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </section>

      <section className='px-4'>
        <ol className='flex flex-col divide-y divide-gray-300'>
          {agruped.length > 0 &&
            agruped.map((group) => {
              return (
                <li key={group.group} className='pt-3 pb-5'>
                  <div>
                    <h2 className='text-lg font-medium text-gray-800 first-letter:uppercase'>
                      {format(group.group)}
                    </h2>
                  </div>
                  <div>
                    <ol className='mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
                      {group.items.length &&
                        group.items.map((bookmark) => {
                          // console.log(history);
                          return (
                            <li key={bookmark.productId}>
                              <div className='relative flex flex-col overflow-hidden rounded-md border border-gray-200 shadow transition duration-150 ease-in-out hover:border-violet-200 hover:ring-4 hover:ring-violet-100'>
                                <Link
                                  to={`/p/${bookmark.product.id}/${bookmark.product.slug}`}
                                >
                                  <div>
                                    <img
                                      className='mx-auto h-full w-full max-w-[180px] object-cover'
                                      src='https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg'
                                      alt='For test'
                                    />
                                  </div>
                                  <div className='flex flex-col justify-center p-2 text-center text-lg leading-tight'>
                                    <h3 className='text-gray-500'>
                                      {bookmark.product.name}
                                    </h3>
                                    <p className='font-medium'>
                                      {Formater.price(bookmark.product.price)}
                                    </p>
                                  </div>
                                </Link>
                                <div className='grid grid-cols-2 divide-x divide-gray-200 border-t border-gray-200 bg-gray-100'>
                                  {/* Button Delete */}
                                  <button
                                    className='flex items-center justify-center p-2 text-gray-400 hover:bg-gray-200 hover:text-indigo-500'
                                    type='button'
                                    onClick={() =>
                                      removeBookmark.mutate(bookmark.productId)
                                    }
                                  >
                                    <XMarkIcon className='h-6 w-6' />
                                  </button>
                                  {/* Button Add to Cart */}
                                  {/* TODO: Agregar pora eliminar del Cart */}
                                  <button
                                    className={clsx(
                                      'flex items-center justify-center p-2',
                                      'disabled:cursor-not-allowed',
                                      bookmark.product.inCart
                                        ? 'relative text-indigo-500'
                                        : 'text-gray-400 hover:bg-gray-200 hover:text-indigo-500'
                                    )}
                                    type='button'
                                    disabled={!!bookmark.product.inCart}
                                    title={
                                      bookmark.product.inCart
                                        ? 'Already in Cart'
                                        : 'Add to Cart'
                                    }
                                    onClick={() =>
                                      addToCart.mutate({
                                        productId: bookmark.productId,
                                      })
                                    }
                                  >
                                    {bookmark.product.inCart && (
                                      <span className='relative -top-[6px] -right-[2px] flex h-3 w-3 items-center justify-center'>
                                        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75'></span>
                                        <span className='absolute inline-flex h-2.5 w-2.5 rounded-full bg-red-500'></span>
                                      </span>
                                    )}
                                    {bookmark.product.inCart ? (
                                      <SolidCartIcon className='absolute h-6 w-6' />
                                    ) : (
                                      <OutlineCartIcon className='h-6 w-6' />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                    </ol>
                  </div>
                </li>
              );
            })}
        </ol>
      </section>

      <section className='mt-auto border-t border-gray-200'>
        <Pagination totalItems={bookmarks.count} />
      </section>
    </main>
  );
};

export default Bookmarks;
