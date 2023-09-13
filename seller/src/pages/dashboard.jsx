import { Renew } from "@carbon/icons-react";
import { Button, DataTableSkeleton, TableContainer } from "@carbon/react";
import { Link } from "react-router-dom";
import {
  TableProduct,
  TableStockAlert,
  useGetProducts,
  useStockAlert,
} from "../features/product";
import { TableQuestion, useGetQAAll } from "../features/qa";
import { TableReviewTimeline, useGetReviewTimeline } from "../features/review";
import { TableSale, useGetSales } from "../features/sale";
import { useGetStoreStats } from "../features/store";
import { StatContainer, StatItem } from "../features/ui/";
import { priceFormatter } from "../utils/formatter";

const Dashboard = () => {
  const stats = useGetStoreStats();
  const sales = useGetSales();
  const stockAlert = useStockAlert();
  const questions = useGetQAAll();
  const reviews = useGetReviewTimeline();
  const products = useGetProducts("sortby=latest");
  console.log("Products", products);

  return (
    <main className="flex w-full flex-col overflow-auto space-y-10">
      <section className="px-4 pt-3">
        {stats.isLoading ? (
          <p>Loading stats...</p>
        ) : (
          <>
            {stats.isSuccess && (
              <>
                <div>
                  <h1 className="text-2xl mb-2 leading-tight font-medium text-neutral-800">
                    Dashboard
                  </h1>
                  <h2 className="text-base font-semibold leading-6 text-gray-900">
                    Last 30 days
                  </h2>
                  <p className="text-sm text-gray-600">
                    Key information about your business performance.
                  </p>
                </div>
                <StatContainer>
                  <StatItem
                    title="Revenue"
                    value={priceFormatter(stats.data.revenue)}
                    to="/sale/list"
                  />
                  <StatItem
                    title="Sold"
                    value={stats.data.sold}
                    to="/sale/list"
                  />
                  <StatItem
                    title="Stock alert"
                    value={stats.data.stockAlert}
                    to="/product/list?stockAlert=true"
                  />
                  <StatItem
                    title="Questions"
                    value={stats.data.questions}
                    to="/product/question/all"
                  />
                </StatContainer>
              </>
            )}
            {stats.isError && <p>Stats error: {stats.error.message}</p>}
          </>
        )}
      </section>

      <section className="px-4">
        {sales.isLoading ? (
          <DataTableSkeleton columnCount={3} showToolbar={false} rowCount={6} />
        ) : (
          <>
            {sales.isSuccess && sales.data.rows.length === 0 && (
              <>
                <TableContainer
                  title="Sales"
                  description="List of sales and their details"
                />
                <div className="border-t border-gray-300 bg-gray-100 px-4 pb-12 pt-10">
                  <p className="text-base font-semibold leading-tight text-gray-900">
                    No sales found
                  </p>
                  <p className="mb-6 mt-1 text-sm leading-tight text-gray-600">
                    It seems that no one has bought anything.
                  </p>

                  <div className="flex flex-col gap-y-2">
                    <Button
                      kind="tertiary"
                      disabled={sales.isLoading}
                      onClick={() => sales.refetch()}
                      renderIcon={(args) => <Renew {...args} size="24" />}
                    >
                      Refresh
                    </Button>
                    <Link to="/sale/list" className="">
                      Go to Sales
                    </Link>
                  </div>
                </div>
              </>
            )}

            {sales.isSuccess && sales.data.rows.length > 0 && (
              <>
                <div className="mb-3">
                  <div className="flex items-start justify-between gap-x-4 mb-1">
                    <h2 className="text-base font-semibold leading-6 text-gray-900">
                      Sales
                    </h2>
                    <Link to="/sale/list">View</Link>
                  </div>
                  <p className="text-sm text-gray-600 leading-snug">
                    The latest sales and their details.
                  </p>
                </div>

                <TableSale data={sales.data.rows} />
              </>
            )}
          </>
        )}
      </section>

      <section className="px-4">
        {stockAlert.isLoading ? (
          <DataTableSkeleton columnCount={3} showToolbar={false} rowCount={6} />
        ) : (
          <>
            {stockAlert.isSuccess && stockAlert.data.rows.length === 0 && (
              <>
                <TableContainer
                  title="Sales"
                  description="List of sales and their details"
                />
                <div className="border-t border-gray-300 bg-gray-100 px-4 pb-12 pt-10">
                  <p className="text-base font-semibold leading-tight text-gray-900">
                    No stock alert
                  </p>
                  <p className="mb-6 mt-1 text-sm leading-tight text-gray-600">
                    It seems that there are no products with low stock.
                  </p>

                  <div className="flex flex-col gap-y-2">
                    <Button
                      kind="tertiary"
                      disabled={stockAlert.isLoading}
                      onClick={() => stockAlert.refetch()}
                      renderIcon={(args) => <Renew {...args} size="24" />}
                    >
                      Refresh
                    </Button>
                    <Link to="/product/stock-alert" className="">
                      Go to stock alert
                    </Link>
                  </div>
                </div>
              </>
            )}

            {stockAlert.isSuccess && stockAlert.data.rows.length > 0 && (
              <>
                <div className="mb-3">
                  <div className="flex items-start justify-between gap-x-4 mb-1">
                    <h2 className="text-base font-semibold leading-6 text-gray-900">
                      Stock alert
                    </h2>
                    <Link to="/product/list">View</Link>
                  </div>
                  <p className="text-sm text-gray-600 leading-snug">
                    List of products with low stock.
                  </p>
                </div>
                <TableStockAlert data={stockAlert.data.rows} />
              </>
            )}
          </>
        )}
      </section>

      <section className="px-4">
        {questions.isLoading ? (
          <DataTableSkeleton columnCount={3} showToolbar={false} rowCount={6} />
        ) : (
          <>
            {questions.isSuccess && questions.data.rows.length === 0 && (
              <>
                <TableContainer
                  title="Questions"
                  description="List of questions and their total without answers."
                />
                <div className="border-t border-gray-300 bg-gray-100 px-4 pb-12 pt-10">
                  <p className="text-base font-semibold leading-tight text-gray-900">
                    No questions found
                  </p>
                  <p className="mb-6 mt-1 text-sm leading-tight text-gray-600">
                    It seems that no one has asked any questions yet.
                  </p>

                  <div className="flex flex-col gap-y-2">
                    <Button
                      kind="tertiary"
                      disabled={questions.isLoading}
                      onClick={() => questions.refetch()}
                      renderIcon={(args) => <Renew {...args} size="24" />}
                    >
                      Refresh
                    </Button>
                    <Link to="/product/question/all" className="">
                      Go to questions
                    </Link>
                  </div>
                </div>
              </>
            )}

            {questions.isSuccess && questions.data.rows.length > 0 && (
              <>
                <div className="mb-3">
                  <div className="flex items-start justify-between gap-x-4 mb-1">
                    <h2 className="text-base font-semibold leading-6 text-gray-900">
                      Questions
                    </h2>
                    <Link to="/product/question/all">View</Link>
                  </div>
                  <p className="text-sm text-gray-600 leading-snug">
                    List of questions and their total without answers.
                  </p>
                </div>
                <TableQuestion data={questions.data.rows} />
              </>
            )}
          </>
        )}
      </section>

      <section className="px-4">
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
                    <Link to="/review/list">Go to reviews</Link>
                  </div>
                </div>
              </>
            )}

            {reviews.isSuccess && reviews.data.rows.length > 0 && (
              <>
                <div className="mb-3">
                  <div className="flex items-start justify-between gap-x-4 mb-1">
                    <h2 className="text-base font-semibold leading-6 text-gray-900">
                      Reviews
                    </h2>
                    <Link to="/product/list">View</Link>
                  </div>
                  <p className="text-sm text-gray-600 leading-snug">
                    Latest reviews about your products
                  </p>
                </div>
                <TableReviewTimeline data={reviews.data.rows} />
              </>
            )}
          </>
        )}
      </section>

      <section className="px-4">
        {products.isLoading ? (
          <DataTableSkeleton columnCount={3} showToolbar={false} rowCount={6} />
        ) : (
          <>
            {products.isSuccess && products.data.rows.length === 0 && (
              <>
                <TableContainer
                  title="Latest products"
                  description="List of the latest products"
                />
                <div className="border-t border-gray-300 bg-gray-100 px-4 pb-12 pt-10">
                  <p className="text-base font-semibold leading-tight text-gray-900">
                    No products found.
                  </p>
                  <p className="mb-6 mt-1 text-sm leading-tight text-gray-600">
                    It seems like you haven&apos;t added any products yet.
                  </p>

                  <div className="flex flex-col gap-y-2">
                    <Button
                      kind="tertiary"
                      disabled={stockAlert.isLoading}
                      onClick={() => stockAlert.refetch()}
                      renderIcon={(args) => <Renew {...args} size="24" />}
                    >
                      Refresh
                    </Button>
                    <Link to="/product/list" className="">
                      Go to products
                    </Link>
                  </div>
                </div>
              </>
            )}

            {products.isSuccess && products.data.rows.length > 0 && (
              <>
                <div className="mb-3">
                  <div className="flex items-start justify-between gap-x-4 mb-1">
                    <h2 className="text-base font-semibold leading-6 text-gray-900">
                      Latest products
                    </h2>
                    <Link to="/product/list">View</Link>
                  </div>
                  <p className="text-sm text-gray-600 leading-snug">
                    List of the latest products
                  </p>
                </div>
                <TableProduct data={products.data.rows} />
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
