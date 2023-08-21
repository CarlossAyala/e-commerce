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
import { StatContainer, StatItem } from "../features/ui/";

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
  return (
    <main className="flex w-full flex-col overflow-auto space-y-8">
      <section className="px-4 pt-4">
        <StatContainer>
          <StatItem title="Revenue" value="$0" to="#" />
          <StatItem title="Sold" value="$0" to="#" />
          <StatItem title="Stock alert" value="1" to="#" />
          <StatItem title="Questions" value="1" to="#" />
        </StatContainer>
      </section>
    </main>
  );
};

export default Dashboard;
