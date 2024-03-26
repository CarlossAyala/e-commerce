import { useParams } from "react-router-dom";
import { useDocumentTitle } from "@/shared/hooks";
import {
  EmptyState,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/shared/components";
import { Skeleton, TextareaSkeleton } from "@/components";
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
      <PageHeader>
        <PageHeaderHeading>Create Review</PageHeaderHeading>
        <PageHeaderDescription>
          Create a review for this product.
        </PageHeaderDescription>
      </PageHeader>

      <section className="space-y-4">
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
          <EmptyState title="Error" description={error.message} />
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
