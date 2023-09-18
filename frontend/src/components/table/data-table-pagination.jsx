import {
  DoubleArrowRightIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  DoubleArrowLeftIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import usePagination from "./hooks/use-pagination";

const itemRangeText = (min, max, total) => `${min}–${max} of ${total} items`;

/**
 * @typedef {import("@tanstack/react-table").Table} Table
 */

/**
 * @param {Object} props
 * @param {Table} props.table
 */
const DataTablePagination = ({ table, count }) => {
  const { initialPage, pageSizes, handlePage, handlePageSize } =
    usePagination();

  const { pageIndex, pageSize } = table.getState().pagination;
  const page = pageIndex + 1;
  const pageCount = table.getPageCount();

  const items = itemRangeText(
    Math.min(pageSize * pageIndex + 1, count),
    Math.min(page * pageSize, count),
    count,
  );

  return (
    <div className="flex flex-wrap justify-between gap-4">
      <div className="flex items-center">
        <p className="text-sm font-medium">{items}</p>
      </div>
      <div className="flex items-center gap-x-1 text-sm font-medium">
        <p>Page</p>
        <Select
          onValueChange={(value) => {
            console.log("Incoming page", value);
            const parseValue = +value;
            handlePage(parseValue);
            table.setPageIndex(parseValue - 1);
          }}
          defaultValue={page}
          value={page}
        >
          <SelectTrigger>
            <span className="mr-1">{page}</span>
          </SelectTrigger>
          <SelectContent className="max-h-40 overflow-auto">
            {[...Array(pageCount)].map((_, index) => (
              <SelectItem key={index} value={index + 1}>
                <span className="mr-2">{index + 1}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p>of</p>
        <p>{pageCount}</p>
      </div>
      <div className="flex items-center gap-x-4">
        <p className="text-sm font-medium">Items</p>
        <Select
          value={pageSize}
          onValueChange={(value) => {
            const parseValue = +value;
            handlePageSize(parseValue);
            table.setPageSize(parseValue);
            if (initialPage !== page) handlePage(initialPage);
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-x-2">
        <Button
          variant="outline"
          className="h-8 w-8 p-1 lg:flex"
          onClick={() => {
            handlePage(initialPage);
            table.setPageIndex(0);
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-1"
          onClick={() => {
            handlePage(page - 1);
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-1"
          onClick={() => {
            handlePage(page + 1);
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-1 lg:flex"
          onClick={() => {
            handlePage(pageCount);
            table.setPageIndex(pageCount - 1);
          }}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DataTablePagination;
