import { Renew } from "@carbon/icons-react";
import { Link, useSearchParams } from "react-router-dom";
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
  Pagination,
} from "@carbon/react";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { useGetReviewOverview } from "../features/review";
import {
  PAGE_SIZES,
  getPage,
  getPageSize,
} from "../constants/pagination.constants";
import { ratingFormatter } from "../utils/formatter";
import { splitFloat } from "../utils/number";

const headers = [
  {
    key: "product",
    header: "Product",
  },
  {
    key: "score",
    header: "Score",
  },
  {
    key: "total",
    header: "Total",
  },
  {
    key: "actions",
    header: "",
  },
];

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

const ReviewOverview = () => {
  const [params, setParams] = useSearchParams();
  const reviews = useGetReviewOverview();
  console.log("Reviews", reviews);

  return (
    <main className="flex w-full flex-col overflow-auto bg-white">
      <section className="px-4 mt-3">
        {reviews.isLoading ? (
          <DataTableSkeleton columnCount={3} showToolbar={false} rowCount={6} />
        ) : (
          <>
            {reviews.isSuccess && reviews.data.rows.length === 0 && (
              <>
                <TableContainer
                  title="Reviews"
                  description="Latest reviews about your products"
                />
                <div className="border-t border-gray-300 bg-gray-100 px-4 pb-12 pt-10">
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
              </>
            )}

            {reviews.isSuccess && reviews.data.rows.length > 0 && (
              <>
                <div className="mb-3">
                  <h2 className="text-base font-semibold leading-6 text-gray-900">
                    Reviews
                  </h2>
                  <p className="text-sm text-gray-600 leading-snug">
                    Latest reviews about your products
                  </p>
                </div>
                <DataTable
                  rows={reviews.data.rows.map(({ product, rating, count }) => ({
                    id: product.id,
                    product: (
                      <Link to={`/product/${product.id}/view`}>
                        <div className="flex items-center gap-x-1 w-44">
                          <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-200">
                            <img
                              className="h-full w-full object-cover"
                              src="https://http2.mlstatic.com/D_NQ_NP_904598-MLU69493154879_052023-O.webp"
                              alt={product.name}
                            />
                          </div>
                          <div className="grow">
                            <p className="line-clamp-1 text-sm leading-tight text-blue-600">
                              {product.name}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ),
                    score: (
                      <div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, index) => (
                            <AverageRating
                              rating={rating}
                              index={++index}
                              key={index}
                            />
                          ))}
                        </div>
                        <p className="text-base mt-1 leading-tight text-gray-600">
                          {ratingFormatter(rating)}
                        </p>
                      </div>
                    ),
                    total: count,
                    actions: (
                      <Link to={`/review/${product.id}/list`} target="_blank">
                        <p className="text-sm leading-tight text-blue-600">
                          View
                        </p>
                      </Link>
                    ),
                  }))}
                  headers={headers}
                >
                  {({ rows, headers }) => (
                    <TableContainer>
                      <Table size="md">
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
                <div className="">
                  <Pagination
                    backwardText="Previous page"
                    forwardText="Next page"
                    itemsPerPageText="Items per page:"
                    onChange={(e) => {
                      const page = getPage(e.page);
                      const pageSize = getPageSize(e.pageSize);

                      setParams((prev) => {
                        prev.delete("page");
                        prev.delete("limit");
                        prev.set("page", page);
                        prev.set("limit", pageSize);
                        return prev;
                      });
                    }}
                    page={getPage(params.get("page"))}
                    pageSize={getPageSize(params.get("limit"))}
                    pageSizes={PAGE_SIZES}
                    size="md"
                    totalItems={reviews.data.count}
                  />
                </div>
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default ReviewOverview;
