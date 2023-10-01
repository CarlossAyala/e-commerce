import { Skeleton } from "./ui/skeleton";

export const TextInputSkeleton = () => {
  return (
    <div className="space-y-1">
      <Skeleton className="h-4 w-14" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
