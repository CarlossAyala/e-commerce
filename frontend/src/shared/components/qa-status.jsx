import { cn } from "../utils";
import { Badge } from ".";

const STATUS = {
  pending: "Pending",
  answered: "Answered",
  rejected: "Rejected",
};
export const QAStatus = ({ status }) => {
  const label = STATUS[status];

  return (
    <Badge
      variant="outline"
      className={cn("uppercase", {
        "border-blue-800 bg-blue-50 text-blue-800": status === "pending",
        "border-green-800 bg-green-50 text-green-800": status === "answered",
        "border-red-800 bg-red-50 text-red-800": status === "rejected",
      })}
    >
      <span
        className={cn("mr-1 size-2 shrink-0 rounded-full", {
          "bg-blue-800": status === "pending",
          "bg-green-800": status === "answered",
          "bg-red-800": status === "rejected",
        })}
      />
      {label}
    </Badge>
  );
};
