import { useSearchParams } from "react-router-dom";
import {
  EmptyPlaceholder,
  MainContent,
  TablePagination,
} from "../../../../../components";
import { useGetOrders } from "../queries";
import { useDebounced } from "../../../../../hooks";
import {
  ArchiveBoxXMarkIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/outline";
import { OrderPreview } from "../components/order-preview";

const Orders = () => {
  const [params] = useSearchParams();
  const debouncedParams = useDebounced(params.toString());

  const {
    data: orders,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetOrders(debouncedParams);

  const hasContent = isSuccess && orders?.rows.length > 0;
  const isEmpty = isSuccess && orders?.rows.length === 0;

  return (
    <MainContent className="max-w-3xl space-y-4">
      <section className="mt-2 space-y-0.5">
        <h2 className="tracking-none scroll-m-20 text-3xl font-bold">Orders</h2>
        <p className="text-muted-foreground">
          Manage your orders and view order details.
        </p>
      </section>

      <section className="space-y-4">
        {isLoading && (
          <>
            <OrderPreview.Skeleton />
            <OrderPreview.Skeleton />
            <OrderPreview.Skeleton />
          </>
        )}
        {isError && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
            <EmptyPlaceholder.Title>
              Error fetching orders
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              {error.message}
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
        {isEmpty && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={ArchiveBoxXMarkIcon} />
            <EmptyPlaceholder.Title>No orders found</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any order yet.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
        {hasContent &&
          orders.rows.map((order) => (
            <OrderPreview key={order.id} order={order} />
          ))}

        <TablePagination totalRows={orders?.count} />
      </section>
    </MainContent>
  );
};

export default Orders;
