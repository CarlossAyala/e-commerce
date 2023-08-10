import { Link } from 'react-router-dom';
import { Button, SkeletonPlaceholder, SkeletonText } from '@carbon/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  useClearBookmark,
  useGetBookmarks,
  useRemoveBookmark,
} from '../features/bookmark';
import { monthYearFormat } from '../utils/formatter';
import { groupByMonthYear } from '../utils/group-by';

const Bookmark = () => {
  const bookmarks = useGetBookmarks();
  const clearBookmark = useClearBookmark();
  const removeBookmark = useRemoveBookmark();

  console.log('Bookmarks', bookmarks);

  const groupBookmarks = groupByMonthYear(bookmarks.data?.rows, 'createdAt');

  const handleDelete = async (productId) => {
    try {
      await removeBookmark.mutateAsync(productId);
    } catch (error) {
      console.log('<Bookmark />');
      console.log('handleDelete', error);
    }
  };

  const handleClear = async () => {
    try {
      await clearBookmark.mutateAsync();
    } catch (error) {
      console.log('<Bookmark />');
      console.log('handleClear', error);
    }
  };

  return (
    <main className='flex w-full flex-col bg-white'>
      <section className='border-b border-gray-200 px-4 pb-4 pt-3'>
        <h1 className='text-2xl font-medium leading-none'>Bookmarks</h1>
      </section>

      {bookmarks.isLoading && (
        <section className='p-4'>
          <div className='w-1/2'>
            <SkeletonText style={{ width: '100%', minWidth: '100%' }} />
          </div>
          <div className='mt-4 grid grid-cols-2 gap-3'>
            <BookmarkItemSkeleton />
            <BookmarkItemSkeleton />
            <BookmarkItemSkeleton />
            <BookmarkItemSkeleton />
            <BookmarkItemSkeleton />
            <BookmarkItemSkeleton />
          </div>
        </section>
      )}

      {bookmarks.isFetched && bookmarks.data?.rows.length === 0 && (
        <section className='p-4'>
          <p className='text-lg font-semibold leading-normal text-gray-800'>
            You don&apos;t have any bookmark yet
          </p>
          <p className='mt-1 text-sm text-gray-500'>
            Visit any product page to bookmark it.
          </p>
        </section>
      )}

      {bookmarks.isFetched && bookmarks.data?.rows.length > 0 && (
        <section className='p-4'>
          <div className='flex justify-end'>
            <Button onClick={handleClear} size='md' kind='secondary'>
              Clear bookmark
            </Button>
          </div>
          <ol className='mt-2 space-y-4'>
            {groupBookmarks.map((item) => (
              <li key={item.key}>
                <p className='text-lg font-semibold capitalize leading-normal text-gray-800'>
                  {monthYearFormat(item.key)}
                </p>

                <ol className='mt-1 grid grid-cols-2 gap-3'>
                  {item.values.map((value) => (
                    <li
                      key={value.productId}
                      className='relative overflow-hidden rounded-md border border-gray-300 shadow-md'
                    >
                      <Link
                        to={`/product/${value.product.id}/${value.product.slug}`}
                      >
                        <div className='overflow-hidden rounded-md p-2 sm:h-20 sm:w-20'>
                          <img
                            className='h-full w-full object-cover'
                            src='https://http2.mlstatic.com/D_NQ_NP_773243-MLA42453247573_072020-V.webp'
                            alt='Example alt'
                          />
                        </div>
                        <div className='p-4'>
                          <p className='line-clamp-1 text-base font-semibold leading-none'>
                            {value.product.name}
                          </p>
                        </div>
                      </Link>
                      <div className='absolute right-0 top-0 z-10 mr-1 mt-1'>
                        <button
                          className='flex items-center justify-center rounded-md bg-gray-100 p-2 text-black hover:bg-gray-200'
                          type='button'
                          onClick={() => handleDelete(value.productId)}
                        >
                          <XMarkIcon className='h-6 w-6' />
                        </button>
                      </div>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </section>
      )}
    </main>
  );
};

const BookmarkItemSkeleton = () => {
  return (
    <div>
      <div className='h-44 overflow-hidden rounded-md'>
        <SkeletonPlaceholder
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      <div className='mt-2 w-full'>
        <SkeletonText style={{ width: '100%', minWidth: '100%' }} />
      </div>
    </div>
  );
};

export default Bookmark;
