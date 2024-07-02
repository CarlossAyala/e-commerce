import { buttonVariants } from "@/shared/components";
import { Link } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { QAStatus } from "@/shared/components";
import { Formatter } from "@/shared/utils";
import { productActionRoutes } from "../../products";
import { questionActionRoutes } from "../utils";
import { QAProductAction } from "./actions";

const { accessor, display } = createColumnHelper();

export const qaOverviewColumns = [
  accessor("name", {
    header: () => "Product",
    cell: (info) => (
      <div className="flex">
        <Link
          className="max-w-md truncate font-medium"
          to={productActionRoutes.details(info.row.original.id)}
        >
          {info.getValue()}
        </Link>
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
          to={questionActionRoutes.product(productId, query)}
        >
          View
        </Link>
      );
    },
  }),
];

export const qaProductColumns = [
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
    cell: (info) => <QAProductAction qa={info.row.original} />,
  }),
];
