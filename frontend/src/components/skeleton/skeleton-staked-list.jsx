import { Skeleton } from "../ui/skeleton";

const SkeletonList = () => {
  return <Skeleton className="h-14 w-full rounded-md" />;
};

export const SkeletonStakedList = () => {
  return (
    <div className="max-w-md">
      <Skeleton className="mb-2 h-3.5 w-16 rounded-md" />
      <div className="space-y-1">
        <SkeletonList />
        <SkeletonList />
        <SkeletonList />
        <SkeletonList />
        <SkeletonList />
      </div>
    </div>
  );
};
