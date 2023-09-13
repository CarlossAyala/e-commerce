import { TableBasic } from "../../ui";
import useTimelineTableProps from "../hooks/use-timeline-table-props";

const TableReviewTimeline = ({ data }) => {
  const props = useTimelineTableProps(data);

  return <TableBasic {...props} />;
};

export default TableReviewTimeline;
