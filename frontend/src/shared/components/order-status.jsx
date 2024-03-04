import { Badge } from "@/components";
import { cn } from "@/libs";

const STATUS = {
  pending: "Pending",
  process: "In process",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  return: "Return",
  refunded: "Refunded",
  completed: "Completed",
};
// TODO: Check out status
export const OrderStatus = ({ status }) => {
  const label = STATUS[status];

  return (
    <>
      <Badge
        variant="outline"
        className={cn("uppercase", {
          "border-blue-800 bg-blue-50 text-blue-800": true,
        })}
      >
        <span
          className={cn("mr-1 size-2 shrink-0 rounded-full", {
            "bg-blue-800": true,
          })}
        />
        {label}
      </Badge>
    </>
  );
};
