import { Skeleton } from "../../../../../components";

export const OrderDetailSkeleton = () => {
  return (
    <div className="w-full max-w-xs">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="mt-2 h-5 w-1/2" />
      <Skeleton className="mt-1 h-5 w-full" />
    </div>
  );
};
