import { Skeleton } from "./ui/skeleton";

export const TextareaInputSkeleton = () => {
  return (
    <div className="space-y-1">
      <Skeleton className="h-4 w-14" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
};
