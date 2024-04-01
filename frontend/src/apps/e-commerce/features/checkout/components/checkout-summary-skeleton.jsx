import { Card, Skeleton } from "@/components";

export const CheckoutSummarySkeleton = () => {
  return (
    <Card className="space-y-4 p-4">
      <div className="flex justify-between gap-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-5 w-1/3" />
      </div>

      <Skeleton className="h-10 w-full" />
    </Card>
  );
};
