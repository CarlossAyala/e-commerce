// import {
//   DataTable,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableHeader,
//   TableBody,
//   TableCell,
// } from "@carbon/react";
import { useGetStoreStats } from "../features/store/store.queries";
import { StatContainer, StatItem } from "../features/ui/";
import { priceFormatter } from "../utils/formatter";

/*
  -  Stats resume
  -- Revenue
  -- Sold products
  -- Count product stock alert
  -- Count product questions

  - Tables
  -- Sales
  -- Stock Alert
  -- Questions Product
  -- Reviews Product
  -- Last published products
*/

const Dashboard = () => {
  const stats = useGetStoreStats();

  return (
    <main className="flex w-full flex-col overflow-auto space-y-8">
      <section className="px-4 pt-4">
        {stats.isLoading ? (
          <p>Loading stats...</p>
        ) : (
          <>
            {stats.isSuccess && (
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
            )}
            {stats.isError && <p>Stats error: {stats.error.message}</p>}
          </>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
