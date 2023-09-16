import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "../../../../components";

const { accessor } = createColumnHelper();

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
    header: "STOCK",
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
