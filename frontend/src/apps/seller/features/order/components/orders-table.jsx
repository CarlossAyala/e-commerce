import { Link, useSearchParams } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
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
import { OrderStatus, Pagination } from "@/shared/components";
import { Formatter } from "@/utils";
import { cn } from "@/libs";
import { useGetOrders } from "../queries";
import { orderActionRoutes } from "../utils";

const { accessor, display } = createColumnHelper();

const columns = [
  accessor("id", {
    header: () => "ID",
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),
  accessor("customer.id", {
    header: () => "Customer",
    cell: (info) => {
      const customer = info.row.original.customer;
      const fullName = `${customer.name} ${customer.lastName}`;
      return (
        <div className="max-w-xs">
          <p className="truncate text-sm font-medium leading-tight">
            {fullName}
          </p>
          <p className="truncate text-sm leading-tight text-muted-foreground">
            {customer.email}
          </p>
        </div>
      );
    },
  }),
  accessor("status", {
    header: () => "Status",
    cell: (info) => <OrderStatus status={info.getValue()} />,
  }),
  accessor("total", {
    header: () => "Total",
    cell: (info) => Formatter.currency(info.getValue()),
  }),
  display({
    id: "actions",
    cell: (info) => (
      <Link
        className={cn(buttonVariants({ variant: "link" }), "p-0")}
        to={orderActionRoutes.details(info.row.original.id)}
      >
        View
      </Link>
    ),
  }),
];

export const OrdersTable = () => {
  const [params] = useSearchParams();
  const { data, isLoading, isError, error } = useGetOrders(params.toString());

  const table = useReactTable({
    columns,
    data: data?.rows,
    getCoreRowModel: getCoreRowModel(),
  });
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
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-48 text-center"
                  >
                    No results.
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
