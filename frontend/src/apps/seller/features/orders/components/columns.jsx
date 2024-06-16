import { Link } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { Formatter } from "@/utils";
import { orderActionRoutes } from "../utils";

const { accessor } = createColumnHelper();

export const ordersColumns = [
  accessor("id", {
    header: () => "ID",
    cell: (info) => (
      <Link
        to={orderActionRoutes.details(info.getValue())}
        className="font-medium"
      >
        {info.getValue()}
      </Link>
    ),
  }),
  accessor("user.id", {
    header: () => "Customer",
    cell: (info) => {
      const customer = info.row.original.user;
      const fullName = `${customer.name} ${customer.lastName}`;

      return (
        <div className="max-w-xs text-sm leading-tight">
          <p className="truncate font-medium">{fullName}</p>
          <p className="truncate text-muted-foreground">{customer.email}</p>
        </div>
      );
    },
  }),
  accessor("total", {
    header: () => "Total",
    cell: (info) => Formatter.currency(info.getValue()),
  }),
];
