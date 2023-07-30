import { Link } from 'react-router-dom';
import { Button, SkeletonPlaceholder, SkeletonText } from '@carbon/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  useClearHistory,
  useGetHistory,
  useRemoveFromHistory,
} from '../features/history';
import { monthYearFormat } from '../utils/formater';
import { groupByMonthYear } from '../utils/group-by';

const History = () => {
  const history = useGetHistory();
  const clearHistory = useClearHistory();
  const removeHistory = useRemoveFromHistory();

  console.log('History', history);

  const handleDelete = async (productId) => {
    try {
      await removeHistory.mutateAsync(productId);
    } catch (error) {
      console.log('<History />');
      console.log('handleDelete', error);
    }
  };

  const handleClear = async () => {
    try {
      await clearHistory.mutateAsync();
    } catch (error) {
      console.log('<History />');
      console.log('handleClear', error);
    }
  };

  const groupHistory = groupByMonthYear(history.data?.rows, 'lastSeenAt');

  return (
    <main className='flex w-full flex-col bg-white'>
      <section className='border-b border-gray-200 px-4 pb-4 pt-3'>
        <h1 className='text-2xl font-medium leading-none'>History</h1>
      </section>

      {history.isLoading && (
        <section className='p-4'>
          <div className='w-1/2'>
            <SkeletonText style={{ width: '100%', minWidth: '100%' }} />
          </div>
          <div className='mt-4 grid grid-cols-2 gap-3'>
            <HistoryItemSkeleton />
            <HistoryItemSkeleton />
            <HistoryItemSkeleton />
            <HistoryItemSkeleton />
            <HistoryItemSkeleton />
            <HistoryItemSkeleton />
          </div>
        </section>
      )}

      {history.isFetched && history.data?.rows.length === 0 && (
        <section className='p-4'>
          <p className='text-lg font-semibold leading-normal text-gray-800'>
            You don&apos;t have any history yet
          </p>
          <p className='mt-1 text-sm text-gray-500'>
            Each time that you visit a product, it&apos;s added to your history.
          </p>
        </section>
      )}

      {history.isFetched && history.data?.rows.length > 0 && (
        <section className='p-4'>
          <div className='flex justify-end'>
            <Button onClick={handleClear} size='md' kind='secondary'>
              Clear history
            </Button>
          </div>
          <ol className='mt-2 space-y-4'>
            {groupHistory.map((item) => (
              <li key={item.key}>
                <p className='text-lg font-semibold capitalize leading-normal text-gray-800'>
                  {monthYearFormat(item.key)}
                </p>

                <ol className='mt-1 grid grid-cols-2 gap-3'>
                  {item.values.map((value) => (
                    <li
                      key={value.id}
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
                          onClick={() => handleDelete(value.id)}
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

const HistoryItemSkeleton = () => {
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

export default History;
