import ToolbarColumnView from "./components/toolbar-column-view";
import ToolbarFilterText from "./components/toolbar-filter-text";
import ToolbarRowAction from "./components/toolbar-row-action";
import ToolbarRowSelected from "./components/toolbar-row-selected";
import ToolbarSearch from "./components/toolbar-search";
import ToolbarFilterProvider from "./provider/toolbar-filter-provider";

/**
 * @typedef {import("@tanstack/react-table").Table} Table
 */

/**
 * @param {Object} props
 * @param {Table} props.table
 */
const DataTableToolbar = ({ table }) => {
  const rowsSelected = table.getSelectedRowModel().rows.length;
  const isAllPageRowsSelected = table.getIsAllPageRowsSelected();

  const countAllRecords = table.options.meta.count;

  const isSomeRowSelected = rowsSelected > 0;

  return (
    <>
      <ToolbarSearch />

      <ToolbarFilterProvider>
        <ToolbarColumnView table={table} />
        <ToolbarFilterText
          title="Type"
          options={["All", "Active", "Completed"]}
        />
      </ToolbarFilterProvider>

      {isSomeRowSelected && <ToolbarRowSelected table={table} />}

      {isAllPageRowsSelected && countAllRecords !== rowsSelected && (
        <ToolbarRowAction table={table} />
      )}
    </>
  );
};

export default DataTableToolbar;
