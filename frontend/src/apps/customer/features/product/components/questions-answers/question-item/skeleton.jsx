import { Skeleton as SkeletonItem } from "../../../../../../../components";

export const Skeleton = () => {
  return (
    <div className="space-y-2">
      <SkeletonItem className="h-5 w-full" />
      <SkeletonItem className="h-5 w-full" />
    </div>
  );
};
