import { StarIcon } from "@heroicons/react/24/solid";
import { EmptyState } from "@/shared/components";
import { Skeleton } from "@/components";
import { useGetReviewsStat } from "../../review";
import { ReviewStars } from "./review-stars";

export const ReviewScore = ({ productId }) => {
  const { data, isLoading, isError, error } = useGetReviewsStat(productId);

  return (
    <div className="w-full max-w-xs shrink-0 space-y-2">
      {!productId || isLoading ? (
        <>
          <div className="flex items-center gap-2">
            <Skeleton className="h-12 w-20" />
            <div className="grow space-y-1">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          </div>
          <div>
            <ul className="space-y-2">
              {new Array(5).fill("").map((_, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Skeleton className="h-2 grow" />
                  <Skeleton className="h-5 w-8 shrink-0" />
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : isError ? (
        <EmptyState
          title="Error"
          description={error.message}
          className="px-4 py-6"
        />
      ) : (
        <>
          <div className="flex items-center gap-2">
            <div>
              <p className="text-5xl font-semibold">{data.average}</p>
            </div>
            <div className="grow space-y-1">
              <ReviewStars rating={data.average} size="xl" />
              <p className="text-sm leading-3 text-muted-foreground">
                {data.count} reviews
              </p>
            </div>
          </div>
          <div>
            <ul className="space-y-px">
              {data.levels.map(({ rating, percentage }) => (
                <li key={rating} className="flex items-center gap-4">
                  <div className="relative h-2 grow">
                    <span className="absolute inset-0 h-full rounded-full bg-gray-200" />
                    <span
                      className="absolute inset-0 h-full rounded-full bg-gray-500"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-muted-foreground">{rating}</p>
                    <StarIcon className="size-4 shrink-0 text-gray-300" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
