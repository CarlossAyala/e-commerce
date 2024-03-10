import { Link } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { RequestVerifyStatus } from "@/shared/components";
import { storeActionRoutes } from "../utils";
import { RequestsVerifyActions } from "./requests-verify-actions";

const { accessor, display } = createColumnHelper();

export const storesColumns = [
  accessor("name", {
    header: () => "Name",
    cell: (info) => (
      <div className="flex">
        <span className="max-w-xs truncate py-1 font-medium">
          {info.getValue()}
        </span>
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
  accessor("official", {
    header: () => "Official",
    cell: (info) => (info.getValue() ? "Yes" : "No"),
  }),
  display({
    id: "actions",
    cell: (info) => (
      <Link
        className="font-medium hover:underline"
        to={storeActionRoutes.store(info.row.original.id)}
      >
        View
      </Link>
    ),
  }),
];

export const requestsVerifyColumns = [
  accessor("store.name", {
    header: () => "Store",
    cell: (info) => (
      <div className="flex">
        <span className="max-w-xs truncate py-1 font-medium">
          {info.getValue()}
        </span>
      </div>
    ),
  }),
  accessor("description", {
    header: () => "Content",
    cell: (info) => (
      <div className="flex">
        <span className="max-w-md truncate">{info.getValue()}</span>
      </div>
    ),
  }),
  accessor("status", {
    header: () => "Status",
    cell: (info) => <RequestVerifyStatus status={info.getValue()} />,
  }),
  display({
    id: "actions",
    cell: (info) => <RequestsVerifyActions row={info.row} />,
  }),
];
