import { useDocumentTitle } from "@/shared/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components";

export const Dashboard = () => {
  useDocumentTitle("Dashboard");

  return (
    <main className="flex-1 space-y-4 px-6 pb-10">
      <h2 className="text-2xl font-bold uppercase tracking-tight">Dashboard</h2>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {new Array(4).fill(0).map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
};
