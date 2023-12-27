import {
  AreaChart,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../components";
import { StatContainer } from "../components/stat-container";

const Home = () => {
  return (
    <main className="space-y-4 overflow-auto p-4">
      <section className="space-y-2">
        <h2 className="tracking-none scroll-m-20 text-3xl font-bold leading-none">
          Dashboard
        </h2>
        <p className="text-sm leading-tight">
          Welcome back, <strong>John Doe</strong>
        </p>
      </section>

      <StatContainer />

      <section className="grid grid-cols-5">
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <AreaChart />
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Home;
