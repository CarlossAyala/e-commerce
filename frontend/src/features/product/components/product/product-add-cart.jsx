import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useCartContext } from '../../../cart/cart.provider';
import clsx from 'clsx';
import {
  useAddBookmark,
  useGetBookmark,
  useRemoveBookmark,
} from '../../../bookmarks';
import { BookmarkSlashIcon as SolidBookmarkSlashIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon as OutlineBookmarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../../auth';

const ProductAddCart = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const [jwt, user] = useAuth();

  const [, handlers] = useCartContext();

  const { data: bookmark, isLoading } = useGetBookmark(product.id);
  const addBookmark = useAddBookmark();
  const removeBookmark = useRemoveBookmark();

  const handleBookmark = () => {
    // console.log(bookmark);
    if (bookmark) {
      removeBookmark.mutate(product.id);
    } else {
      addBookmark.mutate(product.id);
    }
  };

  return (
    <div
      className={clsx(
        'grid grid-rows-[40px] place-items-stretch gap-3',
        jwt && user ? 'grid-cols-[1fr_1fr_auto]' : 'grid-cols-2'
      )}
    >
      <div className='flex-2 flex items-center rounded-md border border-gray-200'>
        <button
          type='button'
          className='h-full rounded-l-md bg-slate-200 p-2 text-indigo-600 disabled:cursor-not-allowed disabled:text-gray-600 disabled:opacity-50'
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
        className='block h-full rounded-md bg-indigo-600 p-2 text-white'
        type='button'
        onClick={() => handlers.addItem(product.id, quantity)}
      >
        Add to cart
      </button>
      {/* Button Add to Favorites */}
      {isLoading ? (
        <p>Loading Bookmark</p>
      ) : (
        <button
          className={clsx(
            'flex items-center justify-center rounded-md border border-gray-200 p-2',
            bookmark
              ? 'text-indigo-500'
              : 'text-gray-400 hover:bg-gray-200 hover:text-indigo-500'
          )}
          type='button'
          title={bookmark ? 'Already in Bookmark' : 'Add to Bookmark'}
          onClick={() => handleBookmark()}
        >
          {bookmark ? (
            <SolidBookmarkSlashIcon className='h-6 w-6' />
          ) : (
            <OutlineBookmarkIcon className='h-6 w-6' />
          )}
        </button>
      )}
    </div>
  );
};

export default ProductAddCart;
