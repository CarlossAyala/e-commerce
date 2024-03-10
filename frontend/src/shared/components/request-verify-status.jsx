import { Badge } from "@/components";
import { cn } from "@/libs";

const STATUS = {
  queue: "Queue",
  approved: "Approved",
  rejected: "Rejected",
};

export const RequestVerifyStatus = ({ status }) => {
  const label = STATUS[status];

  return (
    <>
      <Badge
        variant="outline"
        className={cn("uppercase", {
          "border-blue-800 bg-blue-50 text-blue-800": status === "queue",
          "border-red-800 bg-red-50 text-red-800": status === "rejected",
          "border-green-800 bg-green-50 text-green-800": status === "approved",
        })}
      >
        <span
          className={cn("mr-1 size-2 shrink-0 rounded-full", {
            "bg-blue-800": status === "queue",
            "bg-red-800": status === "rejected",
            "bg-green-800": status === "approved",
          })}
        />
        {label}
      </Badge>
    </>
  );
};
