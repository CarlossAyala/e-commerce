import { Link } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { OrderStatus } from "@/shared/components";
import { buttonVariants } from "@/components";
import { Formatter } from "@/utils";
import { orderActionRoutes } from "../utils";

const { accessor, display } = createColumnHelper();

export const ordersColumns = [
  accessor("id", {
    header: () => "ID",
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),
  accessor("customer.id", {
    header: () => "Customer",
    cell: (info) => {
      const customer = info.row.original.customer;
      const fullName = `${customer.name} ${customer.lastName}`;

      return (
        <div className="max-w-xs text-sm leading-tight">
          <p className="truncate font-medium">{fullName}</p>
          <p className="truncate text-muted-foreground">{customer.email}</p>
        </div>
      );
    },
  }),
  accessor("status", {
    header: () => "Status",
    cell: (info) => <OrderStatus status={info.getValue()} />,
  }),
  accessor("total", {
    header: () => "Total",
    cell: (info) => Formatter.currency(info.getValue()),
  }),
  display({
    id: "actions",
    cell: (info) => (
      <Link
        className={buttonVariants({ variant: "link" })}
        to={orderActionRoutes.details(info.row.original.id)}
      >
        View
      </Link>
    ),
  }),
];
