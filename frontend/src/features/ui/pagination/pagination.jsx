import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import QueryParams from '../../utils/URL/query-params';

const PARAMS = {
  PAGE: 'page',
  LIMIT: 'limit',
};

const DEFAULT_SIZES = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const DEFAULT_SIZE = 10;
const DEFAULT_PAGE = 1;

function renderSelectItems(total) {
  let counter = 1;
  let items = [];
  while (counter <= total) {
    items.push(
      <option key={counter} value={counter}>
        {String(counter)}
      </option>
    );
    counter++;
  }
  return items;
}

const ItemRangeText = (from, to, total) =>
  `${from}–${to} of ${total} ${total === 1 ? 'item' : 'items'}`;

const Pagination = ({ totalItems }) => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_SIZE);

  const totalPages = useMemo(() => {
    return Math.max(Math.ceil(totalItems / pageSize), DEFAULT_PAGE);
  }, [totalItems, pageSize]);

  const firstButtonDisabled = page === 1;
  const backButtonDisabled = page === 1;
  const forwardButtonDisabled = page === totalPages;
  const lastButtonDisabled = page === totalPages;

  const [param, setParam] = useSearchParams();

  const handleSizeChange = (event) => {
    const newPageSize = Number(event.target.value);

    setPage(1);
    setPageSize(newPageSize);

    setParam((prev) => {
      for (const value of Object.values(PARAMS)) {
        prev.delete(value);
      }

      if (newPageSize > DEFAULT_SIZE) prev.set(PARAMS.LIMIT, newPageSize);

      return prev;
    });
  };

  const handlePageChange = (event) => {
    const page = Number(event.target.value);
    if (
      page > 0 &&
      page <= Math.max(Math.ceil(totalItems / pageSize), DEFAULT_PAGE)
    ) {
      setPage(page);
      setParam((prev) => {
        prev.delete(PARAMS.PAGE);

        if (page > DEFAULT_PAGE) prev.set(PARAMS.PAGE, page);

        return prev;
      });
    }
  };

  const incrementPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    setParam((prev) => {
      prev.delete(PARAMS.PAGE);

      prev.set(PARAMS.PAGE, nextPage);

      return prev;
    });
  };

  const decrementPage = () => {
    const nextPage = page - 1;
    setPage(nextPage);
    setParam((prev) => {
      prev.delete(PARAMS.PAGE);

      if (nextPage > DEFAULT_PAGE) prev.set(PARAMS.PAGE, nextPage);

      return prev;
    });
  };

  const goFirstPage = () => {
    setPage(1);
    setParam((prev) => {
      prev.delete(PARAMS.PAGE);

      return prev;
    });
  };

  const goLastPage = () => {
    setPage(totalPages);
    setParam((prev) => {
      prev.delete(PARAMS.PAGE);
      prev.set(PARAMS.PAGE, totalPages);

      return prev;
    });
  };

  const itemsPages = renderSelectItems(totalPages);

  const getParams = () => {
    let paramPage = QueryParams.getNumberParam(
      param,
      PARAMS.PAGE,
      DEFAULT_PAGE
    );
    let paramLimit = QueryParams.getNumberParam(
      param,
      PARAMS.LIMIT,
      DEFAULT_SIZE
    );

    if (paramPage < DEFAULT_PAGE || paramPage > itemsPages) {
      paramPage = DEFAULT_PAGE;
    }
    if (!DEFAULT_SIZES.includes(paramLimit)) {
      paramLimit = DEFAULT_SIZE;
    }
    // console.log('PAGE', paramPage);
    // console.log('LIMIT', paramLimit);
    if (paramPage > DEFAULT_PAGE) {
      setPage(paramPage);
    }
    if (paramLimit > DEFAULT_PAGE) {
      setPageSize(paramLimit);
    }
  };

  useEffect(() => {
    getParams();
  }, [param.toString()]);

  useEffect(() => {}, []);

  return (
    <div className='grid grid-cols-2 grid-rows-2'>
      <div className='flex items-center justify-center border-r border-gray-200 pl-4'>
        <label htmlFor='item_peer_page' className='block text-gray-500'>
          Items per page:
        </label>
        <div>
          <select
            id='item_peer_page'
            name='item_peer_page'
            className='block w-full border-transparent py-2 pr-9 text-gray-500'
            onChange={(e) => handleSizeChange(e)}
            value={pageSize}
          >
            {DEFAULT_SIZES.map((size) => (
              <option key={size} value={size}>
                {String(size)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='flex items-center justify-center px-4'>
        <p className='text-center text-gray-500'>
          {ItemRangeText(
            Math.min(pageSize * (page - 1) + 1, totalItems),
            Math.min(page * pageSize, totalItems),
            totalItems
          )}
        </p>
      </div>
      <div className='flex items-center justify-center border-t border-r border-gray-200 px-4'>
        <div className='mr-2'>
          <select
            id='pages'
            name='pages'
            className='block w-full border-transparent py-2 pr-9 text-gray-500'
            onChange={(e) => handlePageChange(e)}
            value={page}
          >
            {itemsPages}
          </select>
        </div>
        <label htmlFor='pages' className='block text-gray-500'>
          of {totalPages} {totalPages === 1 ? 'page' : 'pages'}
        </label>
      </div>
      <div className='flex border-t border-gray-200 px-4'>
        <button
          type='button'
          className='flex grow items-center justify-center'
          disabled={firstButtonDisabled}
          onClick={() => goFirstPage()}
        >
          <ChevronDoubleLeftIcon className='h-5 w-5' />
        </button>
        <button
          type='button'
          className='flex grow items-center justify-center'
          disabled={backButtonDisabled}
          onClick={() => decrementPage()}
        >
          <ChevronLeftIcon className='h-5 w-5' />
        </button>
        <button
          type='button'
          className='flex grow items-center justify-center'
          disabled={forwardButtonDisabled}
          onClick={() => incrementPage()}
        >
          <ChevronRightIcon className='h-5 w-5' />
        </button>
        <button
          type='button'
          className='flex grow items-center justify-center'
          disabled={lastButtonDisabled}
          onClick={() => goLastPage()}
        >
          <ChevronDoubleRightIcon className='h-5 w-5' />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
