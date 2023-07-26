import {
  Button,
  DataTableSkeleton,
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  Pagination,
  Search,
} from '@carbon/react';
import { useGetProducts } from '../features/product';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { priceFormater } from '../utils/formater';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZES,
  getPage,
  getPageSize,
} from '../constants/pagination.contants';
import { useDebounce } from '../utils/hooks';

const headers = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'price',
    header: 'Price',
  },
  {
    key: 'stock',
    header: 'Stock',
  },
  {
    key: 'status',
    header: 'Status',
  },
];

const ProductList = () => {
  const [params, setParams] = useSearchParams();

  const [search, setSearch] = useState(params.get('q') || '');

  const debouncedQuery = useDebounce(params.toString());
  const products = useGetProducts(debouncedQuery);

  const navigate = useNavigate();

  // console.log(products);
  const handleSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
    setParams((prev) => {
      prev.delete('q');

      if (search !== '') prev.set('q', search);

      return prev;
    });
  };

  const handlePagination = (e) => {
    const page = getPage(e.page);
    const pageSize = getPageSize(e.pageSize);

    setParams((prev) => {
      prev.delete('page');
      prev.delete('limit');

      if (page !== DEFAULT_PAGE) prev.set('page', page);
      if (pageSize !== DEFAULT_PAGE_SIZE) prev.set('limit', pageSize);

      return prev;
    });
  };

  const handleClearFilters = () => {
    setSearch('');
    setParams((prev) => {
      prev.delete('q');
      prev.delete('page');
      prev.delete('limit');

      return prev;
    });
  };

  const rows = products.data?.rows.map((product) => ({
    id: product.id,
    name: (
      <Link className='hover:underline' to={`/product/view/${product.id}`}>
        {product.name}
      </Link>
    ),
    price: priceFormater(product.price),
    stock: product.stock,
    status: product.available ? (
      <span className='items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
        Available
      </span>
    ) : (
      <span className='items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'>
        Unavailable
      </span>
    ),
  }));
  // console.log(rows);

  const thereQuery = debouncedQuery;

  const noResult = products.data?.count === 0 && thereQuery;
  const isEmpty = products.data?.count === 0 && !thereQuery;

  return (
    <main className='overflow-auto bg-gray-200'>
      <section className='border-b border-gray-200 bg-white px-4 pb-4 pt-3'>
        <h1 className='text-3xl leading-none'>Product List</h1>
      </section>

      <section className='p-4'>
        <h2 className='mb-2 text-xl'>Your Products</h2>

        <Search
          id='publish-search'
          labelText='Search'
          className='mb-2'
          onChange={handleSearch}
          value={search}
        />

        <div className='space-y-2'>
          {products.isLoading && (
            <DataTableSkeleton columnCount={2} rowCount={6} />
          )}

          {products.isFetched && isEmpty ? (
            <div>
              <h3 className='mb-1 mt-4 text-base font-medium'>
                Start adding products to your store todays!
              </h3>
              <p className='text-sm text-gray-600'>
                Just click the button below to add a new product to your store.
              </p>

              <Link to='/product/publish' className='mt-4 block'>
                <Button kind='primary'>New product</Button>
              </Link>
            </div>
          ) : null}

          {products.isFetched && noResult ? (
            <div>
              <h3 className='mb-1 mt-4 text-base font-medium'>
                No products found
              </h3>
              <p className='text-sm text-gray-600'>
                Try adjusting you search or filter options to find what
                you&apos;re looking for.
              </p>
              <Button
                kind='ghost'
                size='sm'
                style={{ padding: '0' }}
                onClick={() => handleClearFilters()}
              >
                Clear filters
              </Button>
            </div>
          ) : null}

          {products.isFetched && products.data?.count > 0 ? (
            <>
              <DataTable rows={rows} headers={headers}>
                {({ rows, headers, getHeaderProps, getRowProps }) => (
                  <TableContainer
                    title='Products'
                    description='A list of all the published products in your store.'
                  >
                    <TableToolbar className='relative'>
                      <TableToolbarContent>
                        <Button
                          kind='primary'
                          onClick={() => navigate('/product/publish')}
                        >
                          Add new
                        </Button>
                      </TableToolbarContent>
                    </TableToolbar>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {headers.map((header) => (
                            <TableHeader
                              key={header.id}
                              {...getHeaderProps({ header })}
                            >
                              {header.header}
                            </TableHeader>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.id} {...getRowProps({ row })}>
                            {row.cells.map((cell) => (
                              <TableCell key={cell.id}>{cell.value}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </DataTable>

              <Pagination
                backwardText='Previous page'
                forwardText='Next page'
                itemsPerPageText='Items per page:'
                page={getPage(params.get('page'))}
                size='md'
                pageNumberText='Page Number'
                pageSize={getPageSize(params.get('limit'))}
                pageSizes={PAGE_SIZES}
                totalItems={products.data.count}
                onChange={handlePagination}
              />
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default ProductList;
