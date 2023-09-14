import { DataTableSkeleton } from "@carbon/react";

const TableSkeleton = () => {
  return (
    <DataTableSkeleton
      columnCount={3}
      showToolbar={false}
      showHeader={false}
      rowCount={5}
    />
  );
};

export default TableSkeleton;
