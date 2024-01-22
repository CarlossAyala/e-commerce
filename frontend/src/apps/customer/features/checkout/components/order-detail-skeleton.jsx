import { Skeleton } from "../../../../../components";

export const OrderDetailSkeleton = () => {
  return (
    <div className="w-full space-y-2 sm:max-w-xs">
      <Skeleton className="h-5 w-1/2" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};
