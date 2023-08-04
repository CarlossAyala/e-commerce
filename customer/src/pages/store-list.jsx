import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from '@carbon/react';
import { useGetStores } from '../features/store';
import { groupByFirstLetter } from '../utils/group-by';

const StoreList = () => {
  const [search, setSearch] = useState('');
  const stores = useGetStores();
  // console.log('Stores', stores);

  const groupedStores = useMemo(() => {
    return groupByFirstLetter(stores.data?.rows, 'name');
  }, [stores.data?.rows]);
  // console.log('StoresGrouped', groupedStores);

  return (
    <main className='flex w-full flex-col overflow-auto bg-white'>
      <section className='border-b border-gray-200 px-4 py-2'>
        <h1 className='text-2xl font-medium leading-none'>Store</h1>
        <h2 className='text-lg font-medium leading-snug text-gray-500'>List</h2>
      </section>

      {/* TODO: Add Search, Filters and Infinite Scroll */}
      <div className='pb-4 pt-3'>
        <h3 className='mb-2 px-4 text-lg font-semibold uppercase leading-none text-gray-800'>
          All stores
        </h3>
        <Search
          id='search-stores'
          labelText='Search stores'
          placeholder='Search stores (Dont work)'
          name='search-stores'
          size='lg'
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {stores.isFetched && stores.data?.rows.length > 0 && (
        <section className='px-4'>
          <ol className='space-y-10'>
            {groupedStores.map((letter) => (
              <li key={letter.key}>
                <p className='mb-2 text-3xl font-semibold leading-none text-black'>
                  {letter.key}
                </p>

                <ol className='mt-3 grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4'>
                  {letter.values.map((store) => (
                    <li
                      key={store.id}
                      className='overflow-hidden rounded-md border border-black/10 shadow'
                    >
                      <Link to={`/store/${store.slug}/view`}>
                        <div className='mx-auto h-36 overflow-hidden'>
                          <img
                            src={store.profile}
                            alt={store.name}
                            className='h-full w-full object-cover'
                          />
                        </div>
                        <div className='border-t border-black/10 p-2 text-center'>
                          <h4 className='text-sm font-medium leading-none text-black'>
                            {store.name}
                          </h4>
                        </div>
                      </Link>
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

export default StoreList;
