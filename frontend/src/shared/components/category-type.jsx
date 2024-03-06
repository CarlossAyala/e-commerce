import { Badge } from "@/components";
import { cn } from "@/libs";

const TYPES = {
  main: "Main",
  sub: "Sub",
  single: "Single",
};

export const CategoryType = ({ type }) => {
  const label = TYPES[type];

  return (
    <>
      <Badge
        variant="outline"
        className={cn("uppercase", {
          "border-blue-800 bg-blue-50 text-blue-800": type === "main",
          "border-green-800 bg-green-50 text-green-800": type === "sub",
          "border-violet-800 bg-violet-50 text-violet-800": type === "single",
        })}
      >
        <span
          className={cn("mr-1 size-2 shrink-0 rounded-full", {
            "bg-blue-800": type === "main",
            "bg-green-800": type === "sub",
            "bg-violet-800": type === "single",
          })}
        />
        {label}
      </Badge>
    </>
  );
};
