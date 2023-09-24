import { useParams, useSearchParams } from "react-router-dom";
import { useDebounced } from "../../../../hooks";
import { useGetProductReviews, useGetReview } from "../queries";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Search,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
  TableSkeleton,
} from "../../../../components";
import { Formatter } from "../../../../utils/formatter";
import { useState } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

const ReviewList = () => {
  const [reviewId, setReviewId] = useState(null);
  const [dialog, setDialog] = useState(false);

  const { productId } = useParams();
  const [params] = useSearchParams();
  const debounceParams = useDebounced(params.toString());

  const review = useGetReview(reviewId);
  const reviews = useGetProductReviews(productId, debounceParams);

  const handleOpenDialog = (id) => {
    setReviewId(id);
    setDialog(true);
  };
  const handleCloseDialog = () => {
    setDialog(false);
    setTimeout(() => {
      setReviewId(null);
    }, 1000);
  };

  console.log("Reviews", reviews);

  const isEmpty = reviews.isSuccess && reviews.data?.rows.length === 0;
  const hasContent = reviews.isSuccess && reviews.data?.rows.length > 0;

  return (
    <main className="flex w-full flex-col space-y-4 overflow-auto px-4 pb-20">
      <section className="mt-2">
        <h1 className="text-2xl font-bold tracking-tight">Reviews Product</h1>
        <p className="text-muted-foreground">Product&apos;s review.</p>
      </section>

      <section className="space-y-4">
        <Search />
        {reviews.isLoading && <TableSkeleton />}
        {isEmpty && <TableEmpty />}
        {hasContent && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Review</TableHead>
                  <TableHead className="text-center">Rating</TableHead>
                  <TableHead className="text-center">Likes</TableHead>
                  <TableHead className="text-center">Dislikes</TableHead>
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.data.rows.map((_review) => (
                  <TableRow key={_review.id}>
                    <TableCell className="max-w-sm">
                      <p className="line-clamp-1 font-medium">
                        {_review.description}
                      </p>
                    </TableCell>
                    <TableCell className="text-center">
                      {Formatter.precisionTwo(_review.rating)}
                    </TableCell>
                    <TableCell className="text-center">
                      {_review.like}
                    </TableCell>
                    <TableCell className="text-center">
                      {_review.dislike}
                    </TableCell>
                    <TableCell className="text-center">
                      {Formatter.shortDate(_review.updatedAt)}
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                          >
                            <EllipsisHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onSelect={() => handleOpenDialog(_review.id)}
                          >
                            View
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Sheet open={dialog} onOpenChange={handleCloseDialog}>
              <SheetContent className="space-y-4">
                <SheetHeader>
                  <SheetTitle>Reading review</SheetTitle>
                  <SheetDescription>About this review</SheetDescription>
                </SheetHeader>
                {review.isLoading && <p>Loading...</p>}
                {review.isError && (
                  <p>
                    Error: {review.error?.message ?? "Something went wrong"}
                  </p>
                )}
                {review.isSuccess && (
                  <Card>
                    <CardHeader className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Review</p>
                        <CardTitle className="font-medium">
                          {review.data.description}
                        </CardTitle>
                      </div>
                      <div className="grid grid-cols-3 gap-x-2">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Rating
                          </p>
                          <CardTitle className="font-medium">
                            {Formatter.precisionTwo(review.data.rating)}
                          </CardTitle>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Likes</p>
                          <CardTitle className="font-medium">
                            {review.data.like}
                          </CardTitle>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Dislikes
                          </p>
                          <CardTitle className="font-medium">
                            {review.data.dislike}
                          </CardTitle>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <CardTitle className="font-medium">
                          {Formatter.shortDate(review.data.updatedAt)}
                        </CardTitle>
                      </div>
                    </CardHeader>
                  </Card>
                )}
                <SheetFooter>
                  <Button type="button" onClick={handleCloseDialog}>
                    Close
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </>
        )}

        <TablePagination totalRows={reviews.data?.count} />
      </section>
    </main>
  );
};

export default ReviewList;
