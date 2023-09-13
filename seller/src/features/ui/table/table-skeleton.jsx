import { DataTableSkeleton } from "@carbon/react";

const TableSkeleton = ({ columnCount }) => {
  return (
    <DataTableSkeleton
      columnCount={columnCount}
      showToolbar={false}
      rowCount={6}
    />
  );
};

export default TableSkeleton;
