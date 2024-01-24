import { AreaChart } from "../../../../../components";
import { Formatter } from "../../../../../utils";
import { StatContainer } from "../components/stat-container";
import { TableRequestOfficialStore } from "../components/table-request-official-store";
import { useStatCustomersStores } from "../queries";

const Home = () => {
  const mix = useStatCustomersStores();

  return (
    <main className="space-y-4 overflow-auto p-4">
      <section className="space-y-2">
        <h2 className="tracking-none text-3xl font-bold leading-none">
          Dashboard
        </h2>
        <p className="text-sm leading-tight">
          Welcome back, <strong>John Doe</strong>
        </p>
      </section>

      <StatContainer />

      <section>
        <AreaChart
          title="Customers and Stores"
          data={mix.data}
          isLoading={mix.isLoading}
          isError={mix.isError}
          xAxis={{
            dataKey: "date",
            tickFormatter: Formatter.shortDate,
          }}
          yAxis={{
            allowDecimals: false,
          }}
          area={{
            type: "linear",
          }}
          areas={[
            {
              dataKey: "customers",
              bg: "indigo",
            },
            {
              dataKey: "stores",
              bg: "green",
            },
          ]}
        />
      </section>

      <TableRequestOfficialStore />
    </main>
  );
};

export default Home;
