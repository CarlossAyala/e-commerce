import { TableBasic } from "../../ui";
import useProductTableProps from "../hooks/use-product-table-props";

const TableProduct = ({ data }) => {
  const props = useProductTableProps(data);

  return <TableBasic {...props} />;
};

export default TableProduct;
