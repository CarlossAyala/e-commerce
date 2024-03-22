import { Badge } from "@/components";
import { cn } from "@/libs";

const CONDITION = {
  new: "New",
  used: "Used",
  reconditioned: "Reconditioned",
};
export const ProductCondition = ({ condition }) => {
  const label = CONDITION[condition];

  return (
    <Badge
      variant="outline"
      className={cn("uppercase", {
        "border-green-800 bg-green-50 text-green-800": condition === "new",
        "border-violet-800 bg-violet-50 text-violet-800": condition === "used",
        "border-blue-800 bg-blue-50 text-blue-800":
          condition === "reconditioned",
      })}
    >
      {label}
    </Badge>
  );
};
