import { Skeleton } from "../../../../../components";

export const OrderInformation = () => {};

OrderInformation.Skeleton = function OrderInformationSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-1/2" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};
