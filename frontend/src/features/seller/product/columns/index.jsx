import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "../../../../components";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Formatter } from "../../../../utils/formatter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../../components/ui/button";

const { accessor, display } = createColumnHelper();

export const lowStockColumns = [
  accessor((row) => row.name, {
    id: "product",
    header: "PRODUCT",
    cell: (info) => (
      <div className="max-w-md truncate font-medium">{info.getValue()}</div>
    ),
  }),
  accessor((row) => row.stock, {
    id: "stock",
    header: "STOCK",
    cell: (info) => info.getValue(),
  }),
  accessor((row) => row.stockAlert, {
    id: "stock-alert",
    header: "STOCK",
    cell: (info) => info.getValue(),
  }),
  accessor((row) => row.price, {
    id: "price",
    header: "PRICE",
    cell: (info) => info.getValue(),
  }),
  accessor((row) => row.available, {
    id: "available",
    header: "STATUS",
    cell: (info) => (
      <Badge variant="outline">
        {info.getValue() ? "Available" : "Unavailable"}
      </Badge>
    ),
  }),
];

export const productsColumns = [
  accessor((row) => row.name, {
    id: "product",
    header: "PRODUCT",
    cell: (info) => (
      <div className="max-w-md truncate font-medium">{info.getValue()}</div>
    ),
  }),
  accessor((row) => row.stock, {
    id: "stock",
    header: "STOCK",
    cell: (info) => info.getValue(),
  }),
  accessor((row) => row.stockAlert, {
    id: "stock-alert",
    header: "STOCK ALERT",
    cell: (info) => info.getValue(),
  }),
  accessor((row) => row.price, {
    id: "sold",
    header: "SOLD",
    cell: (info) => info.getValue(),
  }),
  accessor((row) => row.price, {
    id: "price",
    header: "PRICE",
    cell: (info) => info.getValue(),
  }),
  accessor((row) => row.available, {
    id: "available",
    header: "STATUS",
    cell: (info) => (
      <Badge variant="outline">
        {info.getValue() ? "Available" : "Unavailable"}
      </Badge>
    ),
  }),
];

export const productColumnsFull = [
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
    id: "Name",
    header: "NAME",
    cell: (info) => (
      <p className="max-w-md truncate font-medium">{info.getValue()}</p>
    ),
    enableHiding: false,
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
    id: "Sold",
    header: "SOLD",
  }),
  accessor("stock", {
    id: "Stock",
    header: "STOCK",
  }),
  accessor("stockAlert", {
    id: "Stock Alert",
    header: "STOCK ALERT",
  }),
  accessor("available", {
    id: "Available",
    header: "AVAILABLE",
    cell: (info) => (
      <Badge variant="outline">{info.getValue() ? "Yes" : "No"}</Badge>
    ),
  }),
  accessor("createdAt", {
    id: "Created At",
    header: "CREATED AT",
    cell: (info) => {
      const date = info.getValue();
      const formatted = Formatter.createdAt(date);

      return formatted;
    },
  }),
  display({
    id: "Actions",
    header: "",
    cell: () => {
      // cell: ({ row }) => {
      // const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
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
    enableHiding: false,
  }),
];
