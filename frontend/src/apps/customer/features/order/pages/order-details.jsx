import { useParams } from "react-router-dom";
import { useDocumentTitle } from "@/shared/hooks";
import {
  EmptyState,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/shared/components";
import { Card, Skeleton } from "@/components";
import { Formatter } from "@/utils";
import { OrderProduct } from "../components/order-product";
import { OrderSummary } from "../components/order-summary";
import { useGetOrder } from "../queries";

export const OrderDetails = () => {
  useDocumentTitle("Order Details");

  const { orderId } = useParams();
  const { data, isLoading, isError, error } = useGetOrder(orderId);

  return (
    <main className="container max-w-3xl flex-1 space-y-4">
      <PageHeader>
        <PageHeaderHeading>Order Details</PageHeaderHeading>
        <PageHeaderDescription>
          View the details of your order.
        </PageHeaderDescription>
      </PageHeader>

      <section className="space-y-4">
        {isLoading ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {new Array(3).fill(null).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-5 w-1/2" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>

            <Card className="divide-y divide-black/10">
              <OrderProduct.Skeleton />
              <OrderProduct.Skeleton />
              <OrderProduct.Skeleton />
              <OrderSummary.Skeleton />
            </Card>
          </>
        ) : isError ? (
          <EmptyState title="Error" description={error.message} />
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-base font-medium">About</p>
                <div className="space-y-1">
                  <div className="text-sm leading-tight">
                    <span>ID: </span>
                    <span className="text-muted-foreground">
                      {data.order.id}
                    </span>
                  </div>
                  <div className="text-sm leading-tight">
                    <span>Status: </span>
                    <span className="capitalize text-muted-foreground">
                      {data.order.status}
                    </span>
                  </div>
                  <div className="text-sm leading-tight">
                    <span>Date: </span>
                    <span className="text-muted-foreground">
                      {Formatter.fullDate(data.order.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-base font-medium">Billing</p>
                <div className="space-y-1">
                  <div className="text-sm leading-tight">
                    <span className="text-muted-foreground">
                      {data.paymentMethod.billing_details.name}
                    </span>
                  </div>
                  <div className="text-sm leading-tight">
                    <span className="capitalize text-muted-foreground">
                      {data.paymentMethod.card.brand}{" "}
                      {data.paymentMethod.card.funding} {" **** "}
                      {data.paymentMethod.card.last4}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <dt className="text-base font-medium leading-tight">
                  Shipping
                </dt>
                <div className="text-sm font-normal leading-tight text-muted-foreground">
                  <dd>
                    {data.address.street} - {data.address.apartmentNumber}
                  </dd>
                  <dd>
                    {data.address.province} ({data.address.zipCode}),{" "}
                    {data.address.city}
                  </dd>
                  {data.address.indications && (
                    <dd>Indications: {data.address.indications}</dd>
                  )}
                </div>
              </div>
            </div>

            <Card className="divide-y divide-gray-200">
              {data.items.map((item) => (
                <div key={item.id} className="p-4">
                  <OrderProduct item={item} />
                </div>
              ))}
              <OrderSummary order={data} />
            </Card>
          </>
        )}
      </section>
    </main>
  );
};
