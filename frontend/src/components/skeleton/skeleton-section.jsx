import { Skeleton } from "../ui/skeleton";

export const SkeletonTitle = () => {
  return (
    <div className="max-w-md">
      <Skeleton className="mb-2 h-4 w-16 rounded-md" />
      <Skeleton className="h-4 w-3/4 rounded-md" />
    </div>
  );
};
