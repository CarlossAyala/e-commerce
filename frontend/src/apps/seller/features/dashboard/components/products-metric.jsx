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
import { Formatter } from "@/shared/utils";
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
  EmptyState,
} from "@/shared/components";
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
    <Card className="md:col-span-4">
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
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="4" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      const [year, month, day] =
                        payload[0].payload.date.split("-");
                      const date = new Date(year, +month - 1, day);

                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <p className="text-sm uppercase text-muted-foreground">
                            Products{" "}
                            <span className="font-bold">
                              +{payload[0].value}
                            </span>
                          </p>
                          <p className="text-sm uppercase text-muted-foreground">
                            Date{" "}
                            <span className="font-bold">
                              {Formatter.shortDate(date)}
                            </span>
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
