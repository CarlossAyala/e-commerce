import { createColumnHelper } from "@tanstack/react-table";

const { accessor } = createColumnHelper();

export const salesColumns = [
  accessor((row) => row.product.name, {
    id: "product",
    header: "PRODUCT",
    cell: (info) => (
      <div className="max-w-md truncate font-medium">{info.getValue()}</div>
    ),
  }),
  accessor((row) => row.quantity, {
    id: "quantity",
    header: "QUANTITY",
    cell: (info) => info.getValue(),
  }),
  accessor((row) => row.product.price, {
    id: "price",
    header: "PRICE",
    cell: (info) => info.getValue(),
  }),
  accessor((row) => row.quantity * row.product.price, {
    id: "total",
    header: "TOTAL",
    cell: (info) => info.getValue(),
  }),
  accessor("createdAt", {
    id: "createdAt",
    header: "DATE",
    cell: (info) => info.getValue(),
  }),
];
