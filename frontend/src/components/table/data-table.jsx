import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import DataTableSkeleton from "./data-table-skeleton";
import DataTableEmpty from "./data-table-empty";
import DataTableError from "./data-table-error";

/**
 * @typedef {import("@tanstack/react-query").UseQueryResult} UseQueryResult
 * @typedef {import("@tanstack/react-table").ColumnDef} ColumnDef
 */

/**
 *
 * @param {Object} props
 * @param {UseQueryResult} props.query
 * @param {ColumnDef[]} props.columns
 */
const DataTable = ({ query, columns }) => {
  const table = useReactTable({
    columns,
    data: query,
    getCoreRowModel: getCoreRowModel(),
  });

  const isEmpty = query.isSuccess && query.data.rows.length === 0;
  const hasContent = query.isSuccess && query.data.rows.length > 0;

  return (
    <>
      {query.isLoading ? (
        <DataTableSkeleton />
      ) : (
        <>
          {query.isError && <DataTableError />}
          {isEmpty && <DataTableEmpty />}
          {hasContent && (
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
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length}>No results.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </>
  );
};

export default DataTable;
