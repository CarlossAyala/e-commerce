import { Link, useSearchParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  Pagination,
  TableRow,
  TableSkeleton,
} from "@/components";
import { reviewActionRoutes } from "../utils";
import { Formatter } from "@/utils";
import { productActionRoutes } from "../../product";
import { useGetReviewOverview } from "../queries";

const ReviewOverview = () => {
  const [params] = useSearchParams();

  const reviews = useGetReviewOverview(params.toString());

  const isEmpty = reviews.isSuccess && reviews.data?.rows.length === 0;
  const hasContent = reviews.isSuccess && reviews.data?.rows.length > 0;

  return (
    <main className="container flex-1">
      <section className="mt-2">
        <h1 className="text-2xl font-bold tracking-tight">Reviews Overview</h1>
        <p className="text-muted-foreground">Product&apos;s review overview.</p>
      </section>

      <section className="space-y-4">
        {/* <Search /> */}
        {reviews.isLoading && <TableSkeleton />}
        {isEmpty && <TableEmpty />}
        {hasContent && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.data.rows.map((review) => (
                <TableRow key={review.product.id}>
                  <TableCell className="max-w-sm">
                    <Link
                      className="line-clamp-1 font-medium"
                      to={productActionRoutes.details(review.product.id)}
                    >
                      {review.product.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">
                    {Formatter.precisionTwo(review.rating)}
                  </TableCell>
                  <TableCell className="text-center">{review.count}</TableCell>
                  <TableCell className="text-center">
                    <Link to={reviewActionRoutes.list(review.product.id)}>
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Pagination totalRows={reviews.data?.count} />
      </section>
    </main>
  );
};

export default ReviewOverview;
