import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  DataTable,
  Search,
  DataTableSkeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
  Button,
} from '@carbon/react';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZES,
  getPage,
  getPageSize,
} from '../constants/pagination.contants';
import { useDebounce } from '../utils/hooks';
import { useGetQuestions } from '../features/product';

const headers = [
  {
    key: 'name',
    header: 'Product',
  },
  {
    key: 'status',
    header: 'Status',
  },
  {
    key: 'total',
    header: 'Total',
  },
  {
    key: 'action',
    header: 'Actions',
  },
];

const ProductsQuestions = () => {
  const [params, setParams] = useSearchParams();

  const [search, setSearch] = useState(params.get('q') || '');

  const debouncedQuery = useDebounce(params.toString());

  const questions = useGetQuestions(debouncedQuery);
  // console.log('XDDDDDD', questions);

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

  const rows = questions.data?.rows.map((question) => ({
    id: question.product_id,
    name: (
      <Link target='_blank' to={`/product/view/${question.product_id}`}>
        {question.product.name}
      </Link>
    ),
    status: question.product.available ? (
      <span className='items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
        Available
      </span>
    ) : (
      <span className='items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'>
        Unavailable
      </span>
    ),
    total: question.total,
    action: <Link to={`/product/${question.product_id}/questions`}>Ver</Link>,
  }));

  const thereQuery = debouncedQuery !== '';

  const noResult = questions.data?.count.length === 0 && thereQuery;
  const isEmpty = questions.data?.count.length === 0 && !thereQuery;

  return (
    <main className='overflow-auto bg-gray-200'>
      <section className='border-b border-gray-200 bg-white px-4 pb-4 pt-3'>
        <h1 className='text-3xl leading-none'>Products Questions</h1>
      </section>

      <section className='space-y-2 p-4'>
        {/* <h2 className='mb-2 text-xl'>Your Products</h2> */}
        {!isEmpty && (
          <div>
            <Search
              id='question-search'
              size='lg'
              labelText='Search product'
              className='mb-2'
              onChange={handleSearch}
              value={search}
            />
          </div>
        )}

        {questions.isLoading && (
          <DataTableSkeleton columnCount={2} rowCount={6} />
        )}

        {questions.isFetched && isEmpty ? (
          <div>
            <h3 className='text-base font-medium'>
              There are no questions about your products
            </h3>
          </div>
        ) : null}

        {questions.isFetched && noResult ? (
          <div>
            <h3 className='mb-1 mt-4 text-base font-medium'>
              No questions found about the product
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

        {questions.isFetched && questions.data?.count.length > 0 ? (
          <>
            <DataTable rows={rows} headers={headers}>
              {({ rows, headers, getHeaderProps, getTableProps }) => (
                <TableContainer
                  title='Questions'
                  description='All questions about your products appear here.'
                >
                  <Table {...getTableProps()}>
                    <TableHead>
                      <TableRow>
                        {headers.map((header) => (
                          <TableHeader
                            key={header.key}
                            {...getHeaderProps({ header })}
                          >
                            {header.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.id}>
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
              totalItems={questions.data?.count.length}
              onChange={handlePagination}
            />
          </>
        ) : null}
      </section>
    </main>
  );
};

export default ProductsQuestions;
