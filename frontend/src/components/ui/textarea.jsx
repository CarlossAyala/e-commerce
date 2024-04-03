import * as React from "react";

import { cn } from "@/libs/utils";
import { Skeleton } from "./skeleton";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-20 w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

const TextareaSkeleton = ({ label = true }) => {
  return (
    <div className="space-y-2">
      {label && <Skeleton className="h-4 w-1/4" />}
      <Skeleton className="h-20 w-full" />
    </div>
  );
};

export { Textarea, TextareaSkeleton };
