import { Renew } from "@carbon/icons-react";
import { StateContent, TableBasic, TableSkeleton } from "../../ui";
import useQuestionTableProps from "../hooks/use-question-table-props";

/**
 * @typedef {import("@tanstack/react-query").UseQueryResult} UseQueryResult
 *
 *
 * @param {UseQueryResult} props
 */
const TableQuestion = (props) => {
  const { isLoading, isError, refetch, data, hasPagination = false } = props;

  const tableProps = useQuestionTableProps(data);

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return (
      <StateContent
        title="Uh oh. Something’s not quite right."
        subtitle="We were unable to retrieve any data."
        action={{
          text: "Retry",
          onClick: refetch,
          renderIcon: (args) => <Renew {...args} size="24" />,
        }}
        link={{
          text: "Go to Questions",
          to: "/question",
        }}
      />
    );
  }

  if (data?.rows.length === 0) {
    <StateContent
      title="You don’t currently have any question"
      subtitle="We were unable to retrieve any data."
      action={{
        text: "Retry",
        onClick: refetch,
        renderIcon: (args) => <Renew {...args} size="24" />,
      }}
      link={{
        text: "Go to Questions",
        to: "/question",
      }}
    />;
  }

  return <TableBasic {...tableProps} hasPagination={hasPagination} />;
};

export default TableQuestion;
