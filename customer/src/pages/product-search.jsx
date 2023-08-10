import { Fragment, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { Search as SearchInput, Pagination, Dropdown } from '@carbon/react';
import { Close, Filter } from '@carbon/icons-react';
import { priceFormatter } from '../utils/formatter';
import { useSearchProducts } from '../features/product';
import { useDebounce } from '../utils/hooks/use-debounce';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZES,
  getPage,
  getPageSize,
} from '../constants/pagination.contants';

const ProductSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('q') || '');

  const debouncedParams = useDebounce(searchParams.toString());

  const products = useSearchProducts(debouncedParams);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSearchParams((prev) => {
      prev.delete('q');

      if (e.target.value !== '') prev.set('q', e.target.value);

      return prev;
    });
  };

  const handlePagination = (e) => {
    const page = getPage(e.page);
    const pageSize = getPageSize(e.pageSize);

    setSearchParams((prev) => {
      prev.delete('page');
      prev.delete('limit');

      if (page !== DEFAULT_PAGE) prev.set('page', page);
      if (pageSize !== DEFAULT_PAGE_SIZE) prev.set('limit', pageSize);

      return prev;
    });
  };

  const handleClearFilters = () => {
    setSearch('');
    setSearchParams((prev) => {
      prev.delete('q');
      prev.delete('page');
      prev.delete('limit');

      return prev;
    });
  };

  return (
    <main className='overflow-auto bg-gray-200'>
      <section className='border-b border-gray-200 bg-white px-4 pb-4 pt-3'>
        <h1 className='text-3xl leading-none'>Product Search</h1>
      </section>

      <section className='mt-5 flex'>
        <SearchInput
          id='search-products'
          labelText='Search products'
          placeholder='What are you looking for?'
          size='lg'
          onChange={handleSearch}
          value={search}
        />
        <Menu as='div' className='relative inline-block text-left'>
          {({ open }) => (
            <>
              <div className='border-l border-gray-300'>
                <Menu.Button className='inline-flex h-12 w-12 items-center justify-center border-b border-gray-500 bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-opacity-75'>
                  {open ? (
                    <Close label='Filter products' />
                  ) : (
                    <Filter label='Filter products' />
                  )}
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
                <Menu.Items className='absolute right-0 z-10 w-56 origin-top-right divide-y divide-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='px-1 py-1 '>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? 'bg-violet-500 text-white'
                              : 'text-gray-900'
                          } group flex w-full items-center px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <Filter
                              className='mr-2 h-5 w-5'
                              aria-hidden='true'
                            />
                          ) : (
                            <Filter
                              className='mr-2 h-5 w-5'
                              aria-hidden='true'
                            />
                          )}
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? 'bg-violet-500 text-white'
                              : 'text-gray-900'
                          } group flex w-full items-center px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <Filter
                              className='mr-2 h-5 w-5'
                              aria-hidden='true'
                            />
                          ) : (
                            <Filter
                              className='mr-2 h-5 w-5'
                              aria-hidden='true'
                            />
                          )}
                          Duplicate
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className='px-1 py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? 'bg-violet-500 text-white'
                              : 'text-gray-900'
                          } group flex w-full items-center px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <Filter
                              className='mr-2 h-5 w-5'
                              aria-hidden='true'
                            />
                          ) : (
                            <Filter
                              className='mr-2 h-5 w-5'
                              aria-hidden='true'
                            />
                          )}
                          Archive
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? 'bg-violet-500 text-white'
                              : 'text-gray-900'
                          } group flex w-full items-center px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <Filter
                              className='mr-2 h-5 w-5'
                              aria-hidden='true'
                            />
                          ) : (
                            <Filter
                              className='mr-2 h-5 w-5'
                              aria-hidden='true'
                            />
                          )}
                          Move
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className='px-1 py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? 'bg-violet-500 text-white'
                              : 'text-gray-900'
                          } group flex w-full items-center px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <Filter
                              className='mr-2 h-5 w-5 text-violet-400'
                              aria-hidden='true'
                            />
                          ) : (
                            <Filter
                              className='mr-2 h-5 w-5 text-violet-400'
                              aria-hidden='true'
                            />
                          )}
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </section>

      {products.isFetched ? (
        <section className='my-4 border-b-2 border-gray-300'>
          <p className='px-4 pb-2 text-base font-semibold'>
            {products.data?.count || 0} results
          </p>
        </section>
      ) : null}

      <section className='flex items-center bg-gray-100'>
        <p className='flex h-12 items-center border-b border-[#8d8d8d] pl-4 text-sm text-gray-600'>
          Sort by:
        </p>
        <Dropdown
          id='products-sort-by'
          aria-label='Sort by'
          items={['A-Z']}
          label='Sort by'
          hideLabel
          size='lg'
          style={{ flexGrow: '1' }}
        />
      </section>

      {products.isFetched && products.data?.count > 0 ? (
        <>
          <section className=''>
            <ul className='my-4 grid grid-cols-2 gap-4 px-4'>
              {products.data.rows.map((product) => (
                <li key={product.id}>
                  <Link
                    to={`/p/${product.id}/${product.slug}`}
                    className='flex flex-col overflow-hidden rounded-md bg-white shadow'
                  >
                    <div className='p-2'>
                      <img
                        className='mx-auto aspect-square h-full w-full object-cover'
                        src='https://http2.mlstatic.com/D_NQ_NP_773243-MLA42453247573_072020-V.webp'
                        alt='XD'
                      />
                    </div>
                    <div className='px-3 py-2'>
                      <p className='text-sm text-gray-500'>{product.name}</p>
                      <p className='text-base font-semibold text-gray-900'>
                        {priceFormatter(product.price)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <Pagination
              backwardText='Previous page'
              forwardText='Next page'
              itemsPerPageText='Items per page:'
              page={getPage(searchParams.get('page'))}
              pageNumberText='Page Number'
              pageSize={getPageSize(searchParams.get('limit'))}
              pageSizes={PAGE_SIZES}
              totalItems={products.data.count}
              size='lg'
              onChange={handlePagination}
            />
          </section>
        </>
      ) : null}
    </main>
  );
};

export default ProductSearch;
