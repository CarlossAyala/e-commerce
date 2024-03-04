import { createColumnHelper } from "@tanstack/react-table";
import { Formatter } from "@/utils";
import { ReviewListTableAction } from "./review-list-table-action";
import { productActionRoutes } from "../../product";
import { Link } from "react-router-dom";
import { ReviewTimelineTableAction } from "./review-timeline-table-action";

const { accessor, display } = createColumnHelper();

export const reviewTimelineColumns = [
  accessor("item.product.name", {
    header: () => "Product",
    cell: (info) => {
      const productId = info.row.original.item.product.id;

      return (
        <div className="flex">
          <Link
            to={productActionRoutes.details(productId)}
            className="max-w-xs truncate font-medium"
          >
            {info.getValue()}
          </Link>
        </div>
      );
    },
  }),
  accessor("description", {
    header: () => "Content",
    cell: (info) => (
      <div className="flex">
        <span className="max-w-md truncate font-medium">{info.getValue()}</span>
      </div>
    ),
  }),
  accessor("rating", {
    header: () => "Rating",
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),
  accessor("createdAt", {
    header: () => "Created At",
    cell: (info) => {
      return Formatter.shortDate(info.getValue());
    },
  }),
  display({
    id: "actions",
    cell: (info) => <ReviewTimelineTableAction row={info.row} />,
  }),
];

export const reviewListColumns = [
  accessor("description", {
    header: () => "Content",
    cell: (info) => (
      <div className="flex">
        <span className="max-w-md truncate font-medium">{info.getValue()}</span>
      </div>
    ),
  }),
  accessor("rating", {
    header: () => "Rating",
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),
  accessor("createdAt", {
    header: () => "Created At",
    cell: (info) => {
      return Formatter.shortDate(info.getValue());
    },
  }),
  display({
    id: "actions",
    cell: (info) => <ReviewListTableAction row={info.row} />,
  }),
];
