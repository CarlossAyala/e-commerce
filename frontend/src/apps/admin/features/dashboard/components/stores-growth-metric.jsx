import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { EmptyState } from "@/shared/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components";
import { useGetStoresGrowthStats } from "../../stores";
import { INTERVALS, formatDateMetric } from "../utils";

export const StoresGrowthMetric = () => {
  const [params, setParams] = useState(
    new URLSearchParams({
      interval: "7d",
    }),
  );

  const {
    data: stats,
    isLoading,
    isError,
    error,
  } = useGetStoresGrowthStats(params.toString());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stores Growth</CardTitle>
        <CardDescription>Registered stores by intervals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs
          value={params.get("interval")}
          onValueChange={(value) =>
            setParams(
              new URLSearchParams({
                interval: value,
              }),
            )
          }
        >
          <TabsList>
            {INTERVALS.map((interval) => (
              <TabsTrigger key={interval.value} value={interval.value}>
                {interval.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {isLoading ? (
          <Skeleton className="h-72 w-full" />
        ) : isError ? (
          <EmptyState
            title="Something went wrong!"
            description={error.message}
            className="h-72"
          />
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 5,
                }}
              >
                <CartesianGrid horizontal vertical strokeDasharray="4" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      const [item] = payload;

                      return (
                        <section className="rounded-lg border bg-background p-2 shadow-sm">
                          <div>
                            <p className="text-sm uppercase text-muted-foreground">
                              Stores
                            </p>
                            <p className="font-bold text-muted-foreground">
                              + {item.value}
                            </p>
                          </div>
                        </section>
                      );
                    }

                    return null;
                  }}
                />
                <Bar
                  dataKey="count"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                  fill="currentColor"
                  className="fill-primary"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  allowDecimals={false}
                  className="text-sm"
                />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) =>
                    formatDateMetric(value, params.get("interval"))
                  }
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  className="text-xs"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
