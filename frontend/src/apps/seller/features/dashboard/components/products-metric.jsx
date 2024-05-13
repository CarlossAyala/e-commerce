import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
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
import { useGetProductsGrowthStats } from "../../products";
import { INTERVALS, formatDateMetric } from "../utils";

export const ProductsMetric = () => {
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
  } = useGetProductsGrowthStats(params.toString());

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Products Growth</CardTitle>
        <CardDescription>
          Metrics about new products by intervals
        </CardDescription>
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
        ) : !stats.length ? (
          <EmptyState
            title="No stats yet"
            description="Try changing the interval"
            className="h-72"
          />
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={stats}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="4" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <p className="text-sm uppercase text-muted-foreground">
                            Products
                          </p>
                          <p className="font-bold text-muted-foreground">
                            + {payload[0].value}
                          </p>
                        </div>
                      );
                    }

                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  strokeWidth={2}
                  activeDot={{
                    r: 8,
                  }}
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
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
