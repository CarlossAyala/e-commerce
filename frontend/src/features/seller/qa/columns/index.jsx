import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "../../../../components";

const { accessor } = createColumnHelper();

export const allQuestionColumns = [
  accessor((row) => row.product.name, {
    id: "product",
    header: "PRODUCT",
    cell: (info) => (
      <div className="max-w-md truncate font-medium">{info.getValue()}</div>
    ),
  }),
  accessor((row) => row.count, {
    id: "total",
    header: "TOTAL",
    cell: (info) => info.getValue(),
  }),
  accessor((row) => row.available, {
    id: "available",
    header: "STATUS",
    cell: (info) => (
      <Badge variant="outline">
        {info.getValue() ? "Available" : "Unavailable"}
      </Badge>
    ),
  }),
];
