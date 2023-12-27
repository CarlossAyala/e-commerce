import { StatComponent } from "../../../../../components";
import { Formatter } from "../../../../../utils";
import {
  useStatCustomers,
  useStatOrders,
  useStatRevenue,
  useStatStores,
} from "../queries";

export const StatContainer = () => {
  const customers = useStatCustomers();
  const stores = useStatStores();
  const orders = useStatOrders();
  const revenues = useStatRevenue();

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatComponent
        title="Total Customers"
        value={customers.data?.count}
        isError={customers.isError}
        isLoading={customers.isLoading}
      />
      <StatComponent
        title="Total Stores"
        value={stores.data?.count}
        isError={stores.isError}
        isLoading={stores.isLoading}
      />
      <StatComponent
        title="Total Orders"
        description="This month"
        value={orders.data?.count}
        isLoading={orders.isLoading}
        isError={orders.isError}
      />
      <StatComponent
        title="Total Revenue"
        description="This month"
        value={Formatter.money(revenues.data?.revenue)}
        isLoading={revenues.isLoading}
        isError={revenues.isError}
      />
    </section>
  );
};
