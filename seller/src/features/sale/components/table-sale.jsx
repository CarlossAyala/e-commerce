import { TableBasic } from "../../ui";
import useSaleTable from "../hooks/use-sale-table";

const TableSale = ({ data }) => {
  const props = useSaleTable(data);

  return <TableBasic {...props} />;
};

export default TableSale;
