import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DataTableToolbar from "./data-table-toolbar";
import usePagination from "./hooks/use-pagination";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import DataTablePagination from "./data-table-pagination";
import DataTableSkeleton from "./data-table-skeleton";
import DataTableEmpty from "./data-table-empty";
import DataTableError from "./data-table-error";

/**
 * @typedef {import("@tanstack/react-query").UseQueryResult} UseQueryResult
 */

/**
 *
 * @param {Object} props
 * @param {UseQueryResult} props.query
 */
const DataTableFull = ({ query, columns }) => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const pagination = usePagination();

  const countAllRecords = query.data?.count ?? 0;

  const table = useReactTable({
    columns,
    data: query.data?.rows ?? [],
    meta: {
      count: countAllRecords,
    },
    pageCount: Math.max(Math.ceil(countAllRecords / pagination.pageSize), 1),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: pagination.page - 1,
        pageSize: pagination.pageSize,
      },
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
  });

  const isEmpty = query.isSuccess && query.data.rows.length === 0;
  const hasContent = query.isSuccess && query.data.rows.length > 0;

  return (
    <section className="space-y-3 px-4">
      <DataTableToolbar table={table} countAllRecords={countAllRecords} />

      {query.isLoading ? (
        <DataTableSkeleton />
      ) : (
        <>
          {query.isError && <DataTableError />}
          {isEmpty && <DataTableEmpty />}
          {hasContent > 0 && (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </>
      )}
      <DataTablePagination table={table} count={countAllRecords} />
    </section>
  );
};

export default DataTableFull;
