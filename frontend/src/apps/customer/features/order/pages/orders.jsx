import { useSearchParams } from "react-router-dom";
import { OrderPreview } from "../components/order-preview";
import { useGetOrders } from "../queries";
import { useDocumentTitle } from "@/shared/hooks";
import { EmptyPlaceholder, Pagination } from "@/components";

//TODO: Add filters by: status, search by product name
export const Orders = () => {
  useDocumentTitle("Orders");
  const [params] = useSearchParams();

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useGetOrders(params.toString());

  const isEmpty = orders?.rows.length === 0;

  return (
    <main className="container max-w-3xl flex-1 space-y-4">
      <section className="mt-2">
        <h2 className="tracking-none text-3xl font-bold">Orders</h2>
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

        <Pagination totalRows={orders?.count} />
      </section>
    </main>
  );
};
