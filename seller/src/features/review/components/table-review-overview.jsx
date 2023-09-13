import { TableBasic } from "../../ui";
import useOverviewTableProps from "../hooks/use-overview-table-props";

const TableReviewOverview = ({ data }) => {
  const props = useOverviewTableProps(data);

  return <TableBasic {...props} />;
};

export default TableReviewOverview;
