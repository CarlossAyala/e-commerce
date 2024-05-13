import { Link } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { Formatter } from "@/utils";
import { ProductListAction } from "./actions";
import { productActionRoutes } from "../utils";

const { accessor, display } = createColumnHelper();

export const productListColumns = [
  accessor("name", {
    header: () => "Name",
    cell: (info) => (
      <Link
        to={productActionRoutes.details(info.row.original.id)}
        className="flex"
      >
        <span className="max-w-md truncate font-medium">{info.getValue()}</span>
      </Link>
    ),
  }),
  accessor("stock", {
    header: () => "Stock",
    cell: (info) => info.getValue(),
  }),
  accessor("sold", {
    header: () => "Sold",
    cell: (info) => info.getValue() ?? 0,
  }),
  accessor("price", {
    header: () => "Price",
    cell: (info) => Formatter.currency(info.getValue()),
  }),
  accessor("available", {
    header: () => "Available",
    cell: (info) => (info.getValue() ? "Yes" : "No"),
  }),
  display({
    id: "actions",
    cell: (info) => <ProductListAction product={info.row.original} />,
  }),
];
