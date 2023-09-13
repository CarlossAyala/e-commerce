import { TableBasic } from "../../ui";
import useStockAlertTableProps from "../hooks/use-stock-alert-table-props";

const TableStockAlert = ({ data }) => {
  const props = useStockAlertTableProps(data);

  return <TableBasic {...props} />;
};

export default TableStockAlert;
