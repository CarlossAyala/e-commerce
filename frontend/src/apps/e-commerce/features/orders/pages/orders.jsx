import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "@/shared/hooks";
import {
  EmptyState,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  URLPagination,
} from "@/shared/components";
import { OrderPreview } from "../components/order-preview";
import { useGetOrders } from "../queries";

export const Orders = () => {
  useDocumentTitle("Orders");
  const [params] = useSearchParams();

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useGetOrders(params.toString());

  return (
    <main className="container max-w-3xl flex-1 space-y-4 pb-10">
      <PageHeader>
        <PageHeaderHeading>Orders</PageHeaderHeading>
        <PageHeaderDescription>
          Manage and view your orders.
        </PageHeaderDescription>
      </PageHeader>

      <section className="space-y-4">
        {isLoading ? (
          <>
            <OrderPreview.Skeleton />
            <OrderPreview.Skeleton />
            <OrderPreview.Skeleton />
          </>
        ) : isError ? (
          <EmptyState title="Error" description={error.message} />
        ) : !orders.rows.length ? (
          <EmptyState
            title="No orders found"
            description="You don't have any order yet."
          />
        ) : (
          orders.rows.map((order) => (
            <OrderPreview key={order.id} order={order} />
          ))
        )}

        <URLPagination count={orders?.count} />
      </section>
    </main>
  );
};
