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
} from "@/shared/components";
import { useGetUsersGrowthStats } from "../../users";
import { INTERVALS, formatDateMetric } from "../utils";

export const UsersGrowthMetric = () => {
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
  } = useGetUsersGrowthStats(params.toString());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users Growth</CardTitle>
        <CardDescription>Registered users by intervals</CardDescription>
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
              <LineChart
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
                      const [year, month, day] = item.payload.date.split("-");
                      const date = new Date(year, +month - 1, day);

                      return (
                        <section className="rounded-lg border bg-background p-2 shadow-sm">
                          <div>
                            <p className="text-sm uppercase text-muted-foreground">
                              Users{" "}
                              <span className="font-bold">+ {item.value}</span>
                            </p>
                            <p className="text-sm uppercase text-muted-foreground">
                              Date{" "}
                              <span className="font-bold">
                                {Formatter.shortDate(date)}
                              </span>
                            </p>
                          </div>
                        </section>
                      );
                    }

                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  strokeWidth={2}
                  dataKey="count"
                  activeDot={{
                    r: 6,
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
