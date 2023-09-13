import { Renew } from "@carbon/icons-react";
import {
  Button,
  DataTable,
  DataTableSkeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@carbon/react";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  StarIcon as StarSolid,
} from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import { useGetProduct } from "../features/product";
import { useGetProductReviews, useGetScoreReview } from "../features/review";
import { Pagination } from "../features/ui";
import { ddMMYYFormatter } from "../utils/date";
import { ratingFormatter } from "../utils/formatter";
import { splitFloat } from "../utils/number";

const REVIEW_STARS = 5;
const ReviewStars = ({ rating }) => {
  return (
    <div>
      <ol className="flex items-center gap-x-px">
        {[...Array(REVIEW_STARS)].map((_, index) => (
          <li key={index} className="relative h-4 w-4">
            <StarOutline className="absolute h-4 w-4 text-indigo-500" />
            <div
              className="absolute overflow-hidden"
              style={{
                width: rating >= index + 1 ? "100%" : "0%",
              }}
            >
              <StarSolid className="h-4 w-4 text-indigo-500" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

const AverageRating = ({ rating, index }) => {
  const [int, float] = splitFloat(rating);

  let width;
  if (rating >= index) width = "100%";
  else if (rating < index && int === index - 1) width = `${float * 100}%`;
  else width = "0%";

  return (
    <div className="relative h-4 w-4">
      <StarOutline className="absolute h-4 w-4 text-indigo-500" />
      <div className="absolute overflow-hidden" style={{ width }}>
        <StarSolid className="h-4 w-4 text-indigo-500" />
      </div>
    </div>
  );
};

const reviewHeaders = [
  {
    key: "review",
    header: "Review",
  },
  {
    key: "reactions",
    header: "Reactions",
  },
  {
    key: "date",
    header: "Date",
  },
];

const ReviewList = () => {
  const { id: productId } = useParams();

  const product = useGetProduct(productId);
  const reviews = useGetProductReviews(productId);
  const score = useGetScoreReview(productId);
  console.log("Score", score);

  return (
    <main className="flex w-full flex-col overflow-auto bg-white">
      <section className="px-4 mt-3 space-y-6">
        {product.isLoading ? (
          <div>
            <p>Loading product...</p>
          </div>
        ) : (
          <>
            {product.isError && (
              <div>
                <p>Error loading product</p>
              </div>
            )}

            {product.isSuccess && (
              <div>
                <h2 className="text-base font-semibold leading-6 text-gray-900">
                  Product
                </h2>

                <div className="mt-2">
                  <Link to={`/product/${product.data.id}/view`}>
                    <div className="flex items-center gap-x-1">
                      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-200">
                        <img
                          className="h-full w-full object-cover"
                          src="https://http2.mlstatic.com/D_NQ_NP_904598-MLU69493154879_052023-O.webp"
                          alt={product.data.name}
                        />
                      </div>
                      <div className="grow">
                        <p className="line-clamp-1 text-sm leading-tight text-blue-600">
                          {product.data.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </>
        )}

        {score.isLoading ? (
          <div>
            <p>Loading product score...</p>
          </div>
        ) : (
          <>
            {score.isError && (
              <div>
                <p>Error loading product score</p>
              </div>
            )}

            {score.isSuccess && (
              <div>
                <h2 className="text-base font-semibold leading-6 text-gray-900">
                  Review score
                </h2>

                <div className="mt-2">
                  <div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <AverageRating
                          rating={score.data}
                          index={++index}
                          key={index}
                        />
                      ))}
                    </div>
                    <p className="text-base mt-1 leading-tight text-gray-600">
                      {ratingFormatter(score.data)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {reviews.isLoading ? (
          <DataTableSkeleton columnCount={3} showToolbar={false} rowCount={6} />
        ) : (
          <>
            {reviews.isSuccess && reviews.data.rows.length === 0 && (
              <div>
                <div className="mb-3">
                  <h2 className="text-base font-semibold leading-6 text-gray-900">
                    Reviews
                  </h2>
                  <p className="text-sm text-gray-600 leading-snug">
                    Latest reviews about your products
                  </p>
                </div>
                <div className="bg-gray-100 px-4 pb-12 pt-10">
                  <p className="text-base font-semibold leading-tight text-gray-900">
                    No reviews yet
                  </p>
                  <p className="mb-6 mt-1 text-sm leading-tight text-gray-600">
                    It seems that no one has reviewed any of your products yet.
                  </p>

                  <div className="flex flex-col gap-y-2">
                    <Button
                      kind="tertiary"
                      disabled={reviews.isLoading}
                      onClick={() => reviews.refetch()}
                      renderIcon={(args) => <Renew {...args} size="24" />}
                    >
                      Refresh
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {reviews.isSuccess && reviews.data.rows.length > 0 && (
              <div>
                <div className="mb-3">
                  <h2 className="text-base font-semibold leading-6 text-gray-900">
                    Reviews
                  </h2>
                  <p className="text-sm text-gray-600 leading-snug">
                    Latest reviews about your products
                  </p>
                </div>
                <DataTable
                  rows={reviews.data.rows.map(
                    ({
                      id,
                      description,
                      rating,
                      like,
                      dislike,
                      updatedAt,
                    }) => ({
                      id,
                      review: (
                        <div className="w-48">
                          <ReviewStars rating={rating} />
                          <p className="text-sm mt-1 leading-tight text-gray-600">
                            {description}
                          </p>
                        </div>
                      ),
                      reactions: (
                        <div className="flex items-center gap-x-4">
                          <div className="flex items-center">
                            <HandThumbUpIcon className="h-5 w-5 text-gray-800" />
                            <span className="ml-1 leading-tight tabular-nums">
                              {like}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <HandThumbDownIcon className="h-5 w-5 text-gray-800" />
                            <span className="ml-1 leading-tight tabular-nums">
                              {dislike}
                            </span>
                          </div>
                        </div>
                      ),
                      date: ddMMYYFormatter(updatedAt),
                    })
                  )}
                  headers={reviewHeaders}
                >
                  {({ rows, headers }) => (
                    <TableContainer>
                      <Table size="xl">
                        <TableHead>
                          <TableRow>
                            {headers.map((header) => (
                              <TableHeader
                                id={header.key}
                                key={header.key}
                                className="uppercase"
                              >
                                {header.header}
                              </TableHeader>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow key={row.id}>
                              {row.cells.map((cell) => (
                                <TableCell key={cell.id}>
                                  {cell.value}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </DataTable>
                <Pagination count={reviews.data.count} />
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default ReviewList;
