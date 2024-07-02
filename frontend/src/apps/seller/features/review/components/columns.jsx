import { Link } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { Formatter } from "@/shared/utils";
import { productActionRoutes } from "../../products";
import { ReviewListAction, ReviewTimelineAction } from "./actions";

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
            className="max-w-xs truncate font-medium hover:underline"
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
    cell: (info) => (
      <span className="text-muted-foreground">
        {Formatter.shortDate(info.getValue())}
      </span>
    ),
  }),
  display({
    id: "actions",
    cell: (info) => <ReviewTimelineAction review={info.row.original} />,
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
    cell: (info) => (
      <span className="text-muted-foreground">
        {Formatter.shortDate(info.getValue())}
      </span>
    ),
  }),
  display({
    id: "actions",
    cell: (info) => <ReviewListAction review={info.row.original} />,
  }),
];
