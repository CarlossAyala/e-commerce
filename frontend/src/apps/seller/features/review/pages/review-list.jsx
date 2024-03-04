import { useParams, useSearchParams } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyPlaceholder,
  Filters,
  Skeleton,
} from "@/components";
import {
  DataTable,
  DataTableContent,
  DataTableSkeleton,
  Pagination,
} from "@/shared/components";
import { useGetProduct } from "../../product";
import { reviewListColumns } from "../components";
import { useGetReviewAvgRating, useGetReviewsProduct } from "../queries";

const filters = [
  {
    filter_type: "search",
  },
];

export const ReviewList = () => {
  const { productId } = useParams();
  const [params] = useSearchParams();

  const product = useGetProduct(productId);
  const rating = useGetReviewAvgRating(productId);
  const reviews = useGetReviewsProduct(productId, params.toString());

  return (
    <main className="flex-1 space-y-4 px-6 py-4">
      <h2 className="text-2xl font-bold uppercase tracking-tight">
        Reviews Product
      </h2>

      <section className="space-y-1">
        <h3 className="font-medium">Product</h3>

        {product.isLoading ? (
          <Card className="max-w-sm space-y-2 p-4">
            <Skeleton className="h-5 w-1/2" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </Card>
        ) : product.isError ? (
          <EmptyPlaceholder title="Error" description={product.error.message} />
        ) : (
          <Card className="max-w-sm">
            <CardHeader className="space-y-0">
              <CardTitle className="truncate">{product.data.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {product.data.description}
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </section>

      <section className="space-y-1">
        <h3 className="font-medium">Average Rating</h3>

        {rating.isLoading ? (
          <Skeleton className="h-5 w-20" />
        ) : rating.isError ? (
          <EmptyPlaceholder title="Error" description={rating.error.message} />
        ) : (
          <p className="text-muted-foreground">
            {Number(rating.data.rating).toFixed(2)} ({rating.data.count}{" "}
            reviews)
          </p>
        )}
      </section>

      <section className="space-y-2">
        <h3 className="font-medium">Reviews</h3>

        <Filters filters={filters} />

        {reviews.isLoading ? (
          <DataTableSkeleton />
        ) : reviews.isError ? (
          <EmptyPlaceholder title="Error" description={reviews.error.message} />
        ) : !reviews.data?.rows.length ? (
          <DataTableContent columns={reviewListColumns}>
            <div className="grid h-44 place-content-center">
              <p>No reviews found</p>
            </div>
          </DataTableContent>
        ) : (
          <DataTable data={reviews.data.rows} columns={reviewListColumns} />
        )}

        <Pagination count={reviews.data?.count} />
      </section>
    </main>
  );
};
