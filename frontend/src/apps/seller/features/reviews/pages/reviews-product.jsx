import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  DataTable,
  DataTableSkeleton,
  EmptyState,
  PageHeader,
  PageHeaderHeading,
  URLPagination,
  ReviewStars,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Filters,
  Skeleton,
} from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import { productActionRoutes, useGetProduct } from "../../products";
import { productsColumns } from "../components/columns";
import { useGetReviewAvgRating, useGetReviewsProduct } from "../queries";

const filters = [
  {
    filter_type: "search",
  },
];

export const ReviewsProduct = () => {
  const [params] = useSearchParams();
  const { productId } = useParams();

  const product = useGetProduct(productId);
  const rating = useGetReviewAvgRating(productId);
  const reviews = useGetReviewsProduct(productId, params.toString());

  useDocumentTitle(product.data?.name);

  return (
    <main className="flex-1 space-y-4 px-4 tablet:px-6">
      <PageHeader>
        <PageHeaderHeading>Reviews Product</PageHeaderHeading>
      </PageHeader>

      <section className="space-y-1">
        <h3 className="font-medium">Product</h3>

        {product.isLoading ? (
          <Card className="space-y-2 p-4">
            <Skeleton className="h-4 w-1/2" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </Card>
        ) : product.isError ? (
          <EmptyState title="Error" description={product.error.message} />
        ) : (
          <Link to={productActionRoutes.details(productId)} className="block">
            <Card>
              <CardHeader className="space-y-0">
                <CardTitle className="line-clamp-1">
                  {product.data.name}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {product.data.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        )}
      </section>

      <section className="space-y-1">
        <h3 className="font-medium">Average Rating</h3>

        {rating.isLoading ? (
          <div className="flex w-full max-w-xs gap-2">
            <Skeleton className="h-10 w-24 shrink-0" />
            <div className="grow space-y-1">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ) : rating.isError ? (
          <EmptyState title="Error" description={rating.error.message} />
        ) : (
          <div className="flex items-center gap-2">
            <div>
              <p className="text-5xl font-semibold">
                {Number(rating.data.rating).toFixed(1)}
              </p>
            </div>
            <div className="grow space-y-1">
              <ReviewStars rating={rating.data.rating} size="xl" />
              <p className="text-sm leading-3 text-muted-foreground">
                {rating.data.count} reviews
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h3 className="font-medium">Reviews</h3>

        <Filters filters={filters} />

        {reviews.isLoading ? (
          <DataTableSkeleton />
        ) : reviews.isError ? (
          <EmptyState title="Error" description={reviews.error.message} />
        ) : !reviews.data.rows.length ? (
          <EmptyState title="No reviews" description="No reviews to show" />
        ) : (
          <DataTable data={reviews.data.rows} columns={productsColumns} />
        )}

        <URLPagination count={reviews.data?.count} />
      </section>
    </main>
  );
};
