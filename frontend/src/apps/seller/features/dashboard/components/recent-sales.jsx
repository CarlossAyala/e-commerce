import { Link } from "react-router-dom";
import { EmptyState } from "@/shared/components";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/components";
import { Formatter, getInitials } from "@/utils";
import { orderActionRoutes, useGetLatestOrders } from "../../orders";

// TODO: Add profile user photo
export const RecentSales = () => {
  const { data: orders, isLoading, isError, error } = useGetLatestOrders();

  return (
    <Card className="col-span-3 flex flex-col">
      <CardHeader className="shrink-0">
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>Recent sales in this month</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        {isLoading ? (
          new Array(5).fill(null).map((_, index) => (
            <div key={index} className="flex items-center gap-4">
              <Skeleton className="size-9 shrink-0 rounded-full" />
              <div className="grow space-y-1">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-5 w-1/4 shrink-0" />
            </div>
          ))
        ) : isError ? (
          <EmptyState
            title="Something went wrong"
            description={error.message}
            className="size-full"
          />
        ) : !orders.rows.length ? (
          <EmptyState
            title="No orders"
            description="No orders to show"
            className="size-full"
          />
        ) : (
          orders.rows.map((order) => (
            <Link
              to={orderActionRoutes.details(order.id)}
              key={order.id}
              className="block"
            >
              <div className="flex items-center gap-4">
                <Avatar className="border">
                  <AvatarImage src="/avatars/01.png" alt="User avatar" />
                  <AvatarFallback className="text-sm leading-none">
                    {getInitials(
                      `${order.customer.name} ${order.customer.lastName}`,
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="line-clamp-1 font-medium">
                    {order.customer.name} {order.customer.lastName}
                  </p>
                  <p className="line-clamp-1 text-muted-foreground">
                    {order.customer.email}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  {Formatter.currency(
                    order.items.reduce(
                      (acc, item) => acc + +item.price * item.quantity,
                      0,
                    ),
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  );
};
