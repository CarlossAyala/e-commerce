import { useParams } from "react-router-dom";
import { Card, EmptyPlaceholder } from "../../../../../components";
import { useGetOrder } from "../queries";
import { Formatter } from "../../../../../utils/formatter";
import { OrderProduct } from "../components/order-product";
import { OrderSummary } from "../components/order-summary";
import { OrderInformation } from "../components/order-information";

export const OrderDetails = () => {
  const { orderId } = useParams();
  const { data: order, isLoading, isError, error } = useGetOrder(orderId);

  return (
    <main className="container max-w-3xl flex-1 space-y-4">
      <section className="mt-2">
        <h1 className="scroll-m-20 text-3xl font-bold">Order Details</h1>
        <p className="text-muted-foreground">View the details of your order.</p>
      </section>

      <section className="space-y-4">
        {isLoading ? (
          <>
            <OrderInformation.Skeleton />
            <OrderInformation.Skeleton />
            <OrderInformation.Skeleton />
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
            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <dt className="text-base font-medium leading-tight">About</dt>
                <div className="space-y-1">
                  <dd className="text-sm font-normal">
                    ID:{" "}
                    <span className="text-muted-foreground">
                      {order.order.id}
                    </span>
                  </dd>
                  <dd className="text-sm font-normal">
                    Status:{" "}
                    <span className="capitalize text-muted-foreground">
                      {order.order.status}
                    </span>
                  </dd>
                  <dd className="text-sm font-normal">
                    Date:{" "}
                    <span className="text-muted-foreground">
                      {Formatter.longDate(order.order.orderedAt)}
                    </span>
                  </dd>
                </div>
              </div>

              <div className="space-y-1">
                <dt className="text-base font-medium leading-tight">Billing</dt>
                <div className="text-sm font-normal leading-tight text-muted-foreground">
                  <dd>{order.paymentMethod.billing_details.name}</dd>
                  <dd className="capitalize">
                    {order.paymentMethod.card.brand}{" "}
                    {order.paymentMethod.card.funding} {" **** "}
                    {order.paymentMethod.card.last4}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="space-y-1">
              <dt className="text-base font-medium leading-tight">Shipping</dt>
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

            <Card className="divide-y divide-black/10">
              {order.items.map((item) => (
                <OrderProduct key={item.id} item={item} />
              ))}
              <OrderSummary order={order} />
            </Card>
          </>
        )}
      </section>
    </main>
  );
};
