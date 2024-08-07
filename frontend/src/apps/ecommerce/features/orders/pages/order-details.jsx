import { useParams } from "react-router-dom";
import { useDocumentTitle } from "@/shared/hooks";
import {
  EmptyState,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/shared/components";
import { Formatter } from "@/shared/utils";
import { Skeleton } from "@/shared/components";
import { OrderProduct } from "../components/order-product";
import { useGetOrder } from "../queries";

export const OrderDetails = () => {
  useDocumentTitle("Order Details");

  const { orderId } = useParams();
  const { data, isLoading, isError, error } = useGetOrder(orderId);

  return (
    <main className="container max-w-3xl flex-1 space-y-4 pb-10">
      <PageHeader>
        <PageHeaderHeading>Order Details</PageHeaderHeading>
        <PageHeaderDescription>
          View the details of your order.
        </PageHeaderDescription>
      </PageHeader>

      {isLoading ? (
        <section className="space-y-6">
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
            <dt className=" ">Tracking ID</dt>
            <dd className="text-primary">{data.order.id}</dd>
          </dl>

          <dl className="text-sm">
            <div className="space-y-2">
              <dt className="font-medium">Details</dt>
              <dd className="text-muted-foreground">
                <div className="flex justify-between">
                  <p>Placed</p>
                  <p>{Formatter.shortDate(data.order.createdAt)}</p>
                </div>
              </dd>
            </div>
          </dl>

          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <dt className="font-medium">Shipping Address</dt>
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
              <dt className="font-medium">Payment Information</dt>
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

          <ul className="divide-y border-y">
            {data.items.map((item) => (
              <li key={item.productId} className="py-4">
                <OrderProduct item={item} />
              </li>
            ))}
          </ul>

          <dl className="flex justify-between text-base font-medium">
            <dt>Total</dt>
            <dd>{Formatter.currency(data.order.total)}</dd>
          </dl>
        </section>
      )}
    </main>
  );
};
