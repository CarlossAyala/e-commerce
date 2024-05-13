import { PageHeader, PageHeaderHeading } from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import { RecentSales } from "../components/recent-sales";
import { TotalRevenue } from "../components/total-revenue";
import { TotalOrders } from "../components/total-orders";
import { ProductsCountStatus } from "../components/products-count-status";
import { ProductsCount } from "../components/products-count";
import { ProductsMetric } from "../components/products-metric";

export const Dashboard = () => {
  useDocumentTitle("Dashboard");

  return (
    <main className="flex-1 space-y-4 px-4 pb-10 tablet:px-6">
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
      </PageHeader>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <TotalRevenue />
        <TotalOrders />
        <ProductsCount />
        <ProductsCountStatus />
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <ProductsMetric />
        <RecentSales />
      </section>
    </main>
  );
};
