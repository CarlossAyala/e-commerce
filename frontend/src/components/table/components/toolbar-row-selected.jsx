import { Button } from "../../ui/button";

/**
 * @typedef {import("@tanstack/react-table").Table} Table
 */

/**
 * @param {Object} props
 * @param {Table} props.table
 */
const ToolbarRowSelected = ({ table }) => {
  const rows = table.getSelectedRowModel().rows.length;

  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-md border px-2 py-1">
      <p className="text-sm">
        <strong>{rows}</strong> rows selected
      </p>
      <div className="flex items-center gap-x-1">
        <Button variant="destructive">Delete</Button>
        <div className="h-6 w-px rounded-md bg-neutral-300" />
        <Button variant="ghost" onClick={() => table.resetRowSelection(true)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ToolbarRowSelected;
