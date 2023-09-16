import {
  ArchiveBoxIcon,
  BanknotesIcon,
  ChatBubbleLeftEllipsisIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import { StatCard, StatContainer } from "../../../components";
import { TableLowStock, TableProducts } from "../product";
import { TableAllQuestion } from "../qa";
import { TableReviewTimeline } from "../review";
import { TableSales } from "../sale";
import { useGetStoreStats } from "../store";

const Dashboard = () => {
  const stats = useGetStoreStats();
  console.log("Stats", stats);

  return (
    <main className="flex w-full flex-col space-y-8 overflow-auto">
      <section className="mt-3 px-4">
        <h1 className="text-3xl font-semibold leading-tight text-neutral-800">
          Dashboard
        </h1>
        <p className="mt-1 leading-tight text-neutral-600">
          Welcome back, <strong>John Doe</strong>!
        </p>
      </section>

      <section className="space-y-4 px-4">
        <div>
          <h2 className="text-lg font-semibold leading-tight tracking-tight">
            About your store
          </h2>
          <p className="mt-1 leading-tight text-neutral-600">
            Here are some statistics about your store.
          </p>
        </div>

        <StatContainer>
          <StatCard
            title="Total Revenue"
            content={stats.isSuccess ? stats.data?.revenue : "Error"}
            icon={BanknotesIcon}
            isLoading={stats.isLoading}
            isSuccess={stats.isSuccess}
          />
          <StatCard
            title="Total Sales"
            content={stats.isSuccess ? stats.data?.sold : "Error"}
            icon={CreditCardIcon}
            isLoading={stats.isLoading}
            isSuccess={stats.isSuccess}
          />
          <StatCard
            title="In Stock Alert"
            content={stats.isSuccess ? stats.data?.stockAlert : "Error"}
            icon={ArchiveBoxIcon}
            isLoading={stats.isLoading}
            isSuccess={stats.isSuccess}
          />
          <StatCard
            title="Questions"
            content={stats.isSuccess ? stats.data?.questions : "Error"}
            icon={ChatBubbleLeftEllipsisIcon}
            isLoading={stats.isLoading}
            isSuccess={stats.isSuccess}
          />
        </StatContainer>
      </section>

      <section className="space-y-4 px-4">
        <div>
          <h2 className="text-lg font-semibold leading-tight tracking-tight">
            Latest sales
          </h2>
          <p className="mt-1 leading-tight text-neutral-600">
            Here are the latest sales from your store.
          </p>
        </div>

        <TableSales />
      </section>

      <section className="space-y-4 px-4">
        <div>
          <h2 className="text-lg font-semibold leading-tight tracking-tight">
            Low stock
          </h2>
          <p className="mt-1 leading-tight text-neutral-600">
            Here are the products that are running low on stock.
          </p>
        </div>

        <TableLowStock />
      </section>

      <section className="space-y-4 px-4">
        <div>
          <h2 className="text-lg font-semibold leading-tight tracking-tight">
            Questions
          </h2>
          <p className="mt-1 leading-tight text-neutral-600">
            Here are the latest questions about your products.
          </p>
        </div>

        <TableAllQuestion />
      </section>

      <section className="space-y-4 px-4">
        <div>
          <h2 className="text-lg font-semibold leading-tight tracking-tight">
            Reviews
          </h2>
          <p className="mt-1 leading-tight text-neutral-600">
            Here are the latest reviews about your products.
          </p>
        </div>

        <TableReviewTimeline />
      </section>

      <section className="space-y-4 px-4">
        <div>
          <h2 className="text-lg font-semibold leading-tight tracking-tight">
            Products
          </h2>
          <p className="mt-1 leading-tight text-neutral-600">
            Here are the latest products.
          </p>
        </div>

        <TableProducts />
      </section>
    </main>
  );
};

export default Dashboard;
