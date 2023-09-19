import { useState } from "react";
import { Button } from "../../ui/button";

const ToolbarRowAction = ({ table }) => {
  const [isAllRowsTableSelect, setIsSelectAllRowsTable] = useState(false);
  const rowsSelected = table.getSelectedRowModel().rows.length;
  const countAllRecords = table.options.meta.count;

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2 rounded-md border px-2 py-1 sm:justify-between">
      {isAllRowsTableSelect ? (
        <>
          <p className="text-sm">
            <strong>{countAllRecords}</strong> rows have been selected
          </p>
          <Button
            variant="ghost"
            onClick={() => setIsSelectAllRowsTable(false)}
          >
            Deselect
          </Button>
        </>
      ) : (
        <>
          <p className="text-sm">
            <strong>{rowsSelected}</strong> rows on this page have been selected
          </p>
          <Button variant="ghost" onClick={() => setIsSelectAllRowsTable(true)}>
            Select the {countAllRecords} others rows
          </Button>
        </>
      )}
    </div>
  );
};

export default ToolbarRowAction;
