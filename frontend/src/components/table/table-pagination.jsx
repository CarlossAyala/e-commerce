import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import usePagination from "./hooks/use-pagination";
import { cn } from "../../libs/utils";

const TablePagination = ({ totalRows = 0, className = "" }) => {
  const { page, pageSize, pageSizes, handlePage, handlePageSize } =
    usePagination();

  const leftRows = Math.min(pageSize * (page - 1) + 1, totalRows);
  const rightRows = Math.min(page * pageSize, totalRows);
  const totalPages = Math.max(Math.ceil(totalRows / pageSize), 1);

  const handleFirstPage = () => {
    handlePage(1);
  };
  const handlePreviousPage = () => {
    handlePage(page - 1);
  };
  const canPreviousPage = page > 1;
  const canNextPage = page < totalPages;
  const handleNextPage = () => {
    handlePage(page + 1);
  };
  const handleLastPage = () => {
    handlePage(totalPages);
  };

  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex justify-between">
        <Select
          defaultValue={pageSize}
          value={pageSize}
          onValueChange={handlePageSize}
        >
          <SelectTrigger className="w-26 flex h-8 gap-x-1">
            <SelectValue asChild>
              <div>Rows: {pageSize}</div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent side="bottom" className="max-h-40">
            {pageSizes.map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-x-2 text-sm font-normal">
          {leftRows}-{rightRows} of {totalRows} rows
        </div>
      </div>

      <div className="flex items-center justify-between space-x-4 sm:justify-center">
        <Button
          type="button"
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={handleFirstPage}
          disabled={!canPreviousPage}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronDoubleLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={handlePreviousPage}
          disabled={!canPreviousPage}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Select defaultValue={page} value={page} onValueChange={handlePage}>
          <SelectTrigger className="w-26 flex h-8 gap-x-1">
            <SelectValue asChild>
              <div>Page: {page}</div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent side="bottom" className="max-h-40">
            {[...Array(totalPages)].map((_, pageIndex) => (
              <SelectItem key={pageIndex} value={pageIndex + 1}>
                {pageIndex + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={handleNextPage}
          disabled={!canNextPage}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={handleLastPage}
          disabled={!canNextPage}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronDoubleRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default TablePagination;
