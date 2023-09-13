import { Renew } from "@carbon/icons-react";
import {
  Button,
  DataTableSkeleton,
  Pagination,
  TableContainer,
} from "@carbon/react";
import { useSearchParams } from "react-router-dom";

import {
  PAGE_SIZES,
  getPage,
  getPageSize,
} from "../constants/pagination.constants";
import { TableReviewOverview, useGetReviewOverview } from "../features/review";

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
                <TableReviewOverview data={reviews.data.rows} />
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
