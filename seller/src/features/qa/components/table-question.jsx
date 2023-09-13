import { TableBasic } from "../../ui";
import useQuestionTableProps from "../hooks/use-question-table-props";

const TableQuestion = ({ data }) => {
  const props = useQuestionTableProps(data);

  return <TableBasic {...props} />;
};

export default TableQuestion;
