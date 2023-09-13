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

        <TableSale {...sales} />
      </section>

      <section className="px-4">
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

        <TableStockAlert {...stockAlert} />
      </section>

      <section className="px-4">
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

        <TableQuestion {...questions} />
      </section>

      <section className="px-4">
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

        <TableReviewTimeline {...reviews} />
      </section>

      <section className="px-4">
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

        <TableProduct {...products} />
      </section>
    </main>
  );
};

export default Dashboard;
