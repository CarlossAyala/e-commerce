import { useParams } from "react-router-dom";
import { EmptyState, PageHeader, PageHeaderHeading } from "@/shared/components";
import { Skeleton } from "@/components";
import { Formatter } from "@/utils";
import { OrderProduct } from "../components/order-product";
import { useGetOrder } from "../queries";

// TODO: Add feature to change order status
export const OrderDetails = () => {
  const { orderId } = useParams();
  const { data, isLoading, isError, error } = useGetOrder(orderId);

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 space-y-4 px-4 tablet:px-6">
      <PageHeader>
        <PageHeaderHeading className="text-center">
          Order Details
        </PageHeaderHeading>
      </PageHeader>

      {isLoading ? (
        <section className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {new Array(2).fill(0).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>

          <div className="divide-y border-y">
            {new Array(3).fill(0).map((_, index) => (
              <div key={index} className="py-4">
                <OrderProduct.Skeleton />
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-5 w-1/3" />
          </div>
        </section>
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : (
        <section className="space-y-4">
          <dl className="space-y-1 text-sm font-medium">
            <dt className="text-primary">Tracking ID</dt>
            <dd className="text-indigo-600">{data.order.id}</dd>
          </dl>

          <dl className="text-sm">
            <div className="space-y-2">
              <dt className="font-medium text-primary">Details</dt>
              <dd className="text-muted-foreground">
                <div className="flex justify-between">
                  <p>Placed</p>
                  <p>{Formatter.fullDate(data.order.createdAt)}</p>
                </div>
              </dd>
            </div>
          </dl>

          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <dt className="font-medium text-primary">Shipping Address</dt>
              <dd className="text-muted-foreground">
                <address className="not-italic">
                  <p>{data.address.street}</p>
                  <p>
                    {data.address.province} ({data.address.zipCode}),{" "}
                    {data.address.city}
                  </p>
                  <p>Indications: {data.address.indications}</p>
                </address>
              </dd>
            </div>

            <div className="space-y-2">
              <dt className="font-medium text-primary">Payment Information</dt>
              <dd className="text-muted-foreground">
                <p className="capitalize">{data.paymentMethod.card.brand}</p>
                <p>Ending with {data.paymentMethod.card.last4}</p>
                <p>
                  Expires {data.paymentMethod.card.exp_month} /{" "}
                  {data.paymentMethod.card.exp_year}
                </p>
              </dd>
            </div>
          </dl>

          <ul role="list" className="divide-y border-y">
            {data.items.map((item) => (
              <li key={item.productId} className="py-4">
                <OrderProduct item={item} />
              </li>
            ))}
          </ul>

          <dl className="flex justify-between text-base font-medium text-primary">
            <dt>Total</dt>
            <dd>{Formatter.currency(data.order.total)}</dd>
          </dl>
        </section>
      )}
    </main>
  );
};
