import { Link } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { storeActionRoutes } from "../utils";

const { accessor } = createColumnHelper();

export const storesColumns = [
  accessor("name", {
    header: () => "Name",
    cell: (info) => (
      <div className="flex">
        <Link
          to={storeActionRoutes.store(info.row.original.id)}
          className="max-w-xs truncate py-1 font-medium"
        >
          {info.getValue()}
        </Link>
      </div>
    ),
  }),
  accessor("seller", {
    header: () => "Owner",
    cell: (info) => (
      <div className="max-w-md text-sm">
        <p className="truncate font-medium">{`${info.row.original.seller.name} ${info.row.original.seller.lastName}`}</p>
        <p className="truncate text-muted-foreground">
          {info.row.original.seller.email}
        </p>
      </div>
    ),
  }),
];
