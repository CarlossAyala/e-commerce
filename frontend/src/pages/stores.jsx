import { useSearchParams } from 'react-router-dom';
import { useGetStores } from '../features/stores/stores.queries';
import { Pagination } from '../features/ui';
import StoresContainer from '../features/store/components/stores-container';
import { GroupBy } from '../features/utils/helpers';

const Stores = () => {
  const [param] = useSearchParams();
  const { data: stores, isLoading, isError } = useGetStores(param);
  // console.log(stores);

  if (isLoading) return <h1>Loading.....</h1>;
  if (isError) return <h1>Error</h1>;

  const groups = GroupBy.letter(stores.rows, 'name');
  // console.log(groups);

  return (
    <main className='mx-auto flex w-full max-w-7xl flex-col'>
      <section className='px-4 py-2 '>
        <h2 className='text-xl'>Stores</h2>
        <p className='text-sm text-gray-500'>
          We have a variety of stores to choose from to fulfill your order.
        </p>
      </section>

      <section className='px-4 pb-6'>
        {groups.length > 0 &&
          groups.map((group) => (
            <div key={group.letter}>
              <h3 className='my-4 text-2xl uppercase text-gray-500'>
                {group.letter}
              </h3>
              <StoresContainer stores={group.items} />
            </div>
          ))}
      </section>
      <section className='mt-auto border-t border-gray-200'>
        <Pagination totalItems={stores.count} />
      </section>
    </main>
  );
};

export default Stores;
