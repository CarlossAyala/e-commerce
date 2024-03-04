import { useParams } from "react-router-dom";
import { useDocumentTitle } from "@/shared/hooks";
import { Formatter } from "@/utils";
import { Card, EmptyPlaceholder } from "@/components";
import { OrderProduct } from "../components/order-product";
import { OrderSummary } from "../components/order-summary";
import { OrderInformation } from "../components/order-information";
import { useGetOrder } from "../queries";

export const OrderDetails = () => {
  useDocumentTitle("Order Details");

  const { orderId } = useParams();
  const { data: order, isLoading, isError, error } = useGetOrder(orderId);

  return (
    <main className="container max-w-3xl flex-1 space-y-4">
      <section className="mt-2">
        <h1 className="text-3xl font-bold">Order Details</h1>
        <p className="text-muted-foreground">View the details of your order.</p>
      </section>

      <section className="space-y-4">
        {isLoading ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <OrderInformation.Skeleton />
              <OrderInformation.Skeleton />
              <OrderInformation.Skeleton />
            </div>
            <Card className="divide-y divide-black/10">
              <OrderProduct.Skeleton />
              <OrderProduct.Skeleton />
              <OrderProduct.Skeleton />
              <OrderSummary.Skeleton />
            </Card>
          </>
        ) : isError ? (
          <EmptyPlaceholder title="Error" description={error.message} />
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-base font-medium">About</p>
                <div className="space-y-1">
                  <div className="text-sm leading-tight">
                    <span>ID: </span>
                    <span className="text-muted-foreground">
                      {order.order.id}
                    </span>
                  </div>
                  <div className="text-sm leading-tight">
                    <span>Status: </span>
                    <span className="capitalize text-muted-foreground">
                      {order.order.status}
                    </span>
                  </div>
                  <div className="text-sm leading-tight">
                    <span>Date: </span>
                    <span className="text-muted-foreground">
                      {Formatter.fullDate(order.order.orderedAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-base font-medium">Billing</p>
                <div className="space-y-1">
                  <div className="text-sm leading-tight">
                    <span className="text-muted-foreground">
                      {order.paymentMethod.billing_details.name}
                    </span>
                  </div>
                  <div className="text-sm leading-tight">
                    <span className="capitalize text-muted-foreground">
                      {order.paymentMethod.card.brand}{" "}
                      {order.paymentMethod.card.funding} {" **** "}
                      {order.paymentMethod.card.last4}
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
                    {order.order.street} - {order.order.apartmentNumber}
                  </dd>
                  <dd>
                    {order.order.province} ({order.order.zipCode}),{" "}
                    {order.order.city}
                  </dd>
                  {order.order.indications && (
                    <dd>Indications: {order.order.indications}</dd>
                  )}
                </div>
              </div>
            </div>

            <Card className="divide-y divide-gray-200">
              {order.items.map((item) => (
                <div key={item.id} className="p-4">
                  <OrderProduct item={item} />
                </div>
              ))}
              <OrderSummary order={order} />
            </Card>
          </>
        )}
      </section>
    </main>
  );
};
