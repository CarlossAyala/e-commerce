import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  buttonVariants,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EmptyState,
  ReviewItem,
  Spinner,
} from "@/shared/components";
import { useGetReviews, useGetReviewsInfiniteScroll } from "../../review";
import { cn } from "@/shared/utils";

export const ReviewList = ({ productId }) => {
  const { ref, inView } = useInView();

  const {
    data: _data,
    isLoading: _isLoading,
    isError: _isError,
    error: _error,
  } = useGetReviews(productId, "");

  const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetReviewsInfiniteScroll(productId, "");

  useEffect(() => {
    if (inView && !isFetching && !isFetchingNextPage && hasNextPage) {
      fetchNextPage({ cancelRefetch: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const reviews = data?.pages?.flatMap((page) => page.rows);

  return (
    <div className="grow space-y-6">
      {!productId || _isLoading ? (
        <>
          <ReviewItem.Skeleton />
          <ReviewItem.Skeleton />
          <ReviewItem.Skeleton />
        </>
      ) : _isError ? (
        <EmptyState title="Error" description={_error.message} />
      ) : !_data.rows.length ? (
        <div>
          <p className="text-sm text-muted-foreground">No reviews yet.</p>
        </div>
      ) : (
        <>
          {_data.rows.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))}

          {_data?.hasNextPage ? (
            <Dialog>
              <DialogTrigger
                className={cn(
                  buttonVariants({
                    variant: "link",
                  }),
                  "h-auto p-0",
                )}
              >
                Show all reviews
              </DialogTrigger>
              <DialogContent className="h-auto max-w-2xl gap-0 space-y-4 overflow-auto p-0">
                <DialogHeader className="space-y-1.5 px-4 pt-4 text-start">
                  <DialogTitle>Reviews</DialogTitle>
                  <DialogDescription>
                    About this product reviews
                  </DialogDescription>
                </DialogHeader>
                <div className="h-96 space-y-6 overflow-auto px-4 pb-4">
                  {reviews?.map((review, index) => (
                    <div
                      key={review.id}
                      ref={reviews.length === index + 1 ? ref : null}
                    >
                      <ReviewItem review={review} />
                    </div>
                  ))}

                  {hasNextPage && isFetchingNextPage && (
                    <div className="flex items-center justify-center gap-2">
                      <Spinner className="size-4 text-muted-foreground" />
                      <p className="text-center text-sm leading-4 text-muted-foreground">
                        Loading more reviews...
                      </p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ) : null}
        </>
      )}
    </div>
  );
};
