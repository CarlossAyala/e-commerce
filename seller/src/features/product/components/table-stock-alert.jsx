import { Renew } from "@carbon/icons-react";
import { StateContent, TableBasic, TableSkeleton } from "../../ui";
import useStockAlertTableProps from "../hooks/use-stock-alert-table-props";

/**
 * @typedef {import("@tanstack/react-query").UseQueryResult} UseQueryResult
 *
 *
 * @param {UseQueryResult} props
 */
const TableStockAlert = (props) => {
  const { isLoading, isError, refetch, data, hasPagination = false } = props;
  const tableProps = useStockAlertTableProps(data);

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
      title="You don’t currently have any product in low stock"
      subtitle="We were unable to retrieve any data."
      action={{
        text: "Retry",
        onClick: refetch,
        renderIcon: (args) => <Renew {...args} size="24" />,
      }}
      link={{
        text: "Go to Stock Alert",
        to: "/product/stock-alert",
      }}
    />;
  }

  return <TableBasic {...tableProps} hasPagination={hasPagination} />;
};

export default TableStockAlert;
