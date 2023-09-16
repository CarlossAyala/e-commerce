import { createColumnHelper } from "@tanstack/react-table";

const { accessor } = createColumnHelper();

export const reviewTimelineColumns = [
  accessor((row) => row.product.name, {
    id: "product",
    header: "PRODUCT",
    cell: (info) => <div className="max-w-md truncate">{info.getValue()}</div>,
  }),
  accessor((row) => row.description, {
    id: "review",
    header: "REVIEW",
    cell: (info) => (
      <div className="max-w-lg truncate font-medium">{info.getValue()}</div>
    ),
  }),
  accessor((row) => [row.like, row.dislike], {
    id: "reactions",
    header: "REACTIONS",
    cell: (info) => {
      const [like, dislike] = info.getValue();
      return (
        <div className="flex gap-x-4">
          <p className="text-black">{like} L</p>
          <p className="text-black">{dislike} D</p>
        </div>
      );
    },
  }),
  accessor((row) => row.updatedAt, {
    id: "date",
    header: "DATE",
    cell: (info) => info.getValue(),
  }),
];
