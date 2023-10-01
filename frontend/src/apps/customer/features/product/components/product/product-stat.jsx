import { ReviewStar, Skeleton } from "../../../../../../components";
import { useGetReviewStats } from "../../../review";

const ProductStat = ({ productId }) => {
  const { data: stats, isLoading, isError } = useGetReviewStats(productId);

  if (isLoading) {
    return (
      <div className="space-y-1">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-10" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-sm leading-tight text-muted-foreground">
        Error loading product stats.
      </p>
    );
  }

  return (
    <div className="space-y-px">
      <ReviewStar rating={stats.average} className="gap-x-px" />
      <p className="text-sm leading-tight text-muted-foreground">
        {stats.average} ({stats.total})
      </p>
    </div>
  );
};

export default ProductStat;
