import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useGetProducts } from "../product";
import { Badge, DataTablePagination } from "../../../components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Formatter } from "../../../utils/formatter";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Checkbox } from "../../../components/ui/checkbox";
import usePagination from "../../../components/table/hooks/use-pagination";

const { accessor, display } = createColumnHelper();

const columns = [
  display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  accessor("name", {
    header: "NAME",
    cell: (info) => (
      <p className="max-w-md truncate font-medium">{info.getValue()}</p>
    ),
  }),
  accessor("price", {
    header: () => <div className="text-right">PRICE</div>,
    cell: (info) => {
      const amount = info.getValue();
      const formatted = Formatter.price(amount);

      return <div className="text-right">{formatted}</div>;
    },
  }),
  accessor("sold", {
    header: "SOLD",
  }),
  accessor("stock", {
    header: "STOCK",
  }),
  accessor("stockAlert", {
    header: "STOCK ALERT",
  }),
  accessor("available", {
    header: "AVAILABLE",
    cell: (info) => (
      <Badge variant="outline">{info.getValue() ? "Yes" : "No"}</Badge>
    ),
  }),
  accessor("createdAt", {
    header: "CREATED AT",
    cell: (info) => {
      const date = info.getValue();
      const formatted = Formatter.createdAt(date);

      return formatted;
    },
  }),
  display({
    id: "actions",
    header: "",
    cell: () => {
      // cell: ({ row }) => {
      // const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex justify-center">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <EllipsisHorizontalIcon className="h-4 w-4" />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="left">
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];

const ProductList = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [isAllRowsTableSelect, setIsSelectAllRowsTable] = useState(false);

  const products = useGetProducts();
  // console.log("Products", products);

  // PAGINATION
  const pagination = usePagination();
  // console.log("COUNT", products.data?.count ?? 1);
  // console.log("PageSize", pagination.pageSize);
  // console.log(
  //   "Page Count",
  //   Math.max(Math.ceil(products.data?.count / pagination.pageSize), 1),
  // );

  const countAllRecords = products.data?.count ?? 0;
  const table = useReactTable({
    columns,
    data: products.data?.rows ?? [],
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

  const rowsSelected = table.getSelectedRowModel().rows.length;
  const isSomeRowSelected = rowsSelected > 0;
  const isAllPageRowsSelected = table.getIsAllPageRowsSelected();

  return (
    <main className="flex w-full flex-col space-y-4 overflow-auto">
      <section className="mt-2 px-4">
        <h1 className="text-2xl font-bold tracking-tight">Product List</h1>
        <p className="text-muted-foreground">
          Here are all the products in your store.
        </p>
        <p>{products.isError ? products.error.message : ""}</p>
      </section>

      <section className="space-y-3 px-4">
        <div className="flex items-center">
          <Input
            placeholder="Filter name..."
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {isSomeRowSelected && (
          <div className="flex w-full flex-wrap items-center justify-center gap-2 rounded-md border px-2 py-1 sm:justify-between">
            <div>
              <p className="text-sm">
                <strong>{rowsSelected}</strong> rows selected
              </p>
            </div>
            <div className="flex items-center gap-x-1">
              <Button variant="ghost">Delete</Button>
              <div className="h-6 w-px rounded-md bg-neutral-300" />
              <Button
                variant="ghost"
                onClick={() => table.resetRowSelection(true)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
        {/* {isSelectAllRowsTable && countAllProducts !== rowsSelected && ( */}
        {isAllPageRowsSelected && countAllRecords !== rowsSelected && (
          <div className="flex w-full flex-wrap items-center justify-center gap-2 rounded-md border px-2 py-1 sm:justify-between">
            {isAllRowsTableSelect ? (
              <>
                <p className="text-sm">
                  <strong>{countAllRecords}</strong> rows have been selected
                </p>
                <Button
                  variant="ghost"
                  onClick={() => setIsSelectAllRowsTable(false)}
                >
                  Deselect
                </Button>
              </>
            ) : (
              <>
                <p className="text-sm">
                  <strong>{rowsSelected}</strong> rows on this page have been
                  selected
                </p>
                <Button
                  variant="ghost"
                  onClick={() => setIsSelectAllRowsTable(true)}
                >
                  Select the {countAllRecords} others rows
                </Button>
              </>
            )}
          </div>
        )}
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} count={countAllRecords} />
      </section>
    </main>
  );
};

export default ProductList;
