import { Link, useSearchParams } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pagination } from "@/shared/components";
import {
  Button,
  EmptyPlaceholder,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton,
  buttonVariants,
} from "@/components";
import { useGetQA } from "../queries";
import { qaActionRoutes } from "../utils";

const { accessor, display } = createColumnHelper();

const columns = [
  accessor("name", {
    header: () => "Product",
    cell: (info) => (
      <div className="flex">
        <span className="max-w-lg truncate font-medium">{info.getValue()}</span>
      </div>
    ),
  }),
  accessor("questions", {
    header: () => "Count",
    cell: (info) => info.getValue().length,
  }),
  display({
    id: "actions",
    cell: (info) => {
      const params = new URLSearchParams(window.location.search);
      const status = params.getAll("status");
      const query = status.map((s) => `status=${s}`).join("&");

      const productId = info.row.original.id;

      return (
        <Link
          className={buttonVariants({ variant: "link" })}
          to={qaActionRoutes.product(productId, `?${query}`)}
        >
          View
        </Link>
      );
    },
  }),
];

export const QAOverviewTable = () => {
  const [params, setParams] = useSearchParams();
  const { data, isLoading, isError, error } = useGetQA(params.toString());

  const table = useReactTable({
    columns,
    data: data?.rows,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleClearFilters = () => {
    setParams({});
  };

  const hasFilters = params.toString() !== "";

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : (
        <>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
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
                ))
              ) : hasFilters ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-48 text-center"
                  >
                    <p>No results.</p>
                    <Button
                      type="button"
                      className="mt-4"
                      onClick={handleClearFilters}
                    >
                      Clear Filters
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-48 text-center"
                  >
                    You are up to date.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Pagination count={data?.count} />
        </>
      )}
    </>
  );
};
