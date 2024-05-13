import { PageHeader, PageHeaderHeading } from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import { TotalUsers } from "../components/total-users";
import { TotalStores } from "../components/total-stores";
import { TotalProducts } from "../components/total-products";
import { TotalCategories } from "../components/total-categories";
import { UsersGrowthMetric } from "../components/users-growth-metric";
import { StoresGrowthMetric } from "../components/stores-growth-metric";

export const Dashboard = () => {
  useDocumentTitle("Dashboard");

  return (
    <main className="flex-1 space-y-4 px-4 pb-10 tablet:px-6">
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
      </PageHeader>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <TotalUsers />
        <TotalStores />
        <TotalProducts />
        <TotalCategories />
      </section>

      <section className="grid gap-4 desktop:grid-cols-2">
        <UsersGrowthMetric />
        <StoresGrowthMetric />
      </section>
    </main>
  );
};
