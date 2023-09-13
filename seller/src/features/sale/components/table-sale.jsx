import { Renew } from "@carbon/icons-react";
import { StateContent, TableBasic, TableSkeleton } from "../../ui";
import useSaleTable from "../hooks/use-sale-table";

/**
 * @typedef {import("@tanstack/react-query").UseQueryResult} UseQueryResult
 *
 *
 * @param {UseQueryResult} props
 */
const TableSale = (props) => {
  const { isLoading, isError, refetch, data, hasPagination = false } = props;

  const tableProps = useSaleTable(data);

  if (isLoading) {
    return <TableSkeleton columnCount={tableProps.headers.length} />;
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
          text: "Go to sales",
          to: "/sale",
        }}
      />
    );
  }

  if (data?.rows.length === 0) {
    <StateContent
      title="You don’t currently have any sale"
      subtitle="We were unable to retrieve any data."
      action={{
        text: "Retry",
        onClick: refetch,
        renderIcon: (args) => <Renew {...args} size="24" />,
      }}
      link={{
        text: "Go to sales",
        to: "/sale",
      }}
    />;
  }

  return <TableBasic {...tableProps} hasPagination={hasPagination} />;
};

export default TableSale;
