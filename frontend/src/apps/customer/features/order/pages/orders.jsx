import { useSearchParams } from "react-router-dom";
import { EmptyPlaceholder, TablePagination } from "../../../../../components";
import { useGetOrders } from "../queries";
import { useDebounced } from "../../../../../hooks";

import { OrderPreview } from "../components/order-preview";

export const Orders = () => {
  const [params] = useSearchParams();
  const debouncedParams = useDebounced(params.toString());

  const {
    data: orders,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetOrders(debouncedParams);

  const isEmpty = isSuccess && orders.rows.length === 0;

  return (
    <main className="container max-w-3xl flex-1 space-y-4">
      <section className="mt-2">
        <h2 className="tracking-none scroll-m-20 text-3xl font-bold">Orders</h2>
        <p className="text-muted-foreground">Manage and view order details.</p>
      </section>

      <section className="space-y-4">
        {isLoading ? (
          <>
            <OrderPreview.Skeleton />
            <OrderPreview.Skeleton />
            <OrderPreview.Skeleton />
          </>
        ) : isError ? (
          <EmptyPlaceholder title="Error" description={error.message} />
        ) : isEmpty ? (
          <EmptyPlaceholder
            title="No orders found"
            description="You don't have any order yet."
          />
        ) : (
          orders.rows.map((order) => (
            <OrderPreview key={order.id} order={order} />
          ))
        )}

        <TablePagination totalRows={orders?.count} />
      </section>
    </main>
  );
};
