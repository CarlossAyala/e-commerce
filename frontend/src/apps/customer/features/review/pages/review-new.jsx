import { useParams } from "react-router-dom";
import { EmptyPlaceholder, Skeleton, TextareaSkeleton } from "@/components";
import { useDocumentTitle } from "@/shared/hooks";
import { useGetOrderItem } from "../../order";
import { ReviewProduct } from "../components/review-product";
import { ReviewProductForm } from "../components/review-product-form";

export const ReviewNew = () => {
  useDocumentTitle("Create Review");
  const { orderItemId } = useParams();

  const {
    data: review,
    isLoading,
    isError,
    error,
  } = useGetOrderItem(orderItemId);

  return (
    <main className="container max-w-3xl flex-1 space-y-4">
      <section className="mt-4">
        <h2 className="text-2xl font-semibold tracking-tight">Create Review</h2>
        <p className="text-sm text-muted-foreground">
          Create a review for the product you are reviewing.
        </p>
      </section>

      <section className="space-y-6">
        {isLoading ? (
          <>
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <ReviewProduct.Skeleton className="rounded-md border border-black/10" />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="mx-auto h-12 w-1/2" />
            </div>

            <TextareaSkeleton />

            <Skeleton className="h-9 w-24" />
          </>
        ) : isError ? (
          <EmptyPlaceholder title="Error" description={error.message} />
        ) : (
          <>
            <div className="space-y-2">
              <h3 className="text-sm font-medium leading-tight">Product</h3>
              <ReviewProduct
                className="rounded-md border border-black/10"
                product={review.product}
              />
            </div>
            <ReviewProductForm review={review} />
          </>
        )}
      </section>
    </main>
  );
};
