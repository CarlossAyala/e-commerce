import { Link } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { cn, Formatter } from "@/shared/utils";
import { buttonVariants } from "@/shared/components";
import { productActionRoutes } from "../../products";
import { ReviewListAction } from "./actions";

const { accessor, display } = createColumnHelper();

export const overviewColumns = [
  accessor("name", {
    header: () => "Product",
    cell: (info) => {
      const product = info.row.original;

      return (
        <div className="flex">
          <Link
            to={productActionRoutes.details(product.id)}
            className="max-w-xs truncate font-medium hover:underline"
          >
            {info.getValue()}
          </Link>
        </div>
      );
    },
  }),
  accessor("rating", {
    header: () => "Rating",
    cell: (info) => {
      const review = info.row.original;

      return (
        <p className="font-medium">
          <span>
            {review.rating} ({review.count})
          </span>
        </p>
      );
    },
  }),
  display({
    id: "actions",
    cell: (info) => (
      <Link
        to={`/seller/reviews/${info.row.original.id}`}
        className={cn(
          buttonVariants({
            variant: "link",
          }),
        )}
      >
        Overview
      </Link>
    ),
  }),
];

export const productsColumns = [
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
