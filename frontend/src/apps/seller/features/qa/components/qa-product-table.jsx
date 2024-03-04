import { useParams, useSearchParams } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pagination, QAStatus } from "@/shared/components";
import {
  EmptyPlaceholder,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton,
} from "@/components";
import { Formatter } from "@/utils";
import { useGetQAByProductId } from "../queries";
import { QAProductTableAction } from "./qa-product-table-action";

const { accessor, display } = createColumnHelper();

const columns = [
  accessor("content", {
    header: () => "Question",
    cell: (info) => (
      <div className="flex">
        <span className="max-w-md truncate font-medium">{info.getValue()}</span>
      </div>
    ),
  }),
  accessor("status", {
    header: () => "Status",
    cell: (info) => <QAStatus status={info.getValue()} />,
  }),
  accessor("createdAt", {
    header: () => "Created At",
    cell: (info) => Formatter.fullDate(info.getValue()),
  }),
  display({
    id: "actions",
    cell: (info) => <QAProductTableAction row={info.row} />,
  }),
];

export const QAProductTable = () => {
  const { productId } = useParams();

  const [params] = useSearchParams();

  const { data, isLoading, isError, error } = useGetQAByProductId(
    productId,
    params.toString(),
  );

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
