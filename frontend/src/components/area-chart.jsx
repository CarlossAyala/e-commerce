import {
  Area,
  AreaChart as AreaRechart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const colors = {
  indigo: "text-indigo-500",
  green: "text-green-500",
  red: "text-red-500",
  yellow: "text-yellow-500",
  blue: "text-blue-500",
  purple: "text-purple-500",
  pink: "text-pink-500",
  orange: "text-orange-500",
  teal: "text-teal-500",
  cyan: "text-cyan-500",
  gray: "text-gray-500",
};

// const config = [
// 	{
// 		xAxis: {
// 			dataKey: "name",
// 			tickFormatter: (value) => value,
// 		},
// 		yAxis: {
// 			dataKey: "pv",
// 			tickFormatter: (value) => value,
// 		},
// 		area: {
// 			dataKey: "pv",
// 			bg: "indigo",
// 		},
// 	},
// ];
export const AreaChart = ({
  title,
  xAxis,
  yAxis,
  data,
  areas,
  area,
  isLoading,
  isError,
}) => {
  return (
    <Card className="col-span-5">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        {isLoading ? (
          <Skeleton className="h-[350px] w-full" />
        ) : isError ? (
          <div className="flex h-[350px] w-full items-center justify-center border border-dashed text-center text-gray-500">
            Something went wrong
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <AreaRechart data={data}>
              <CartesianGrid strokeDasharray="5" />
              <XAxis {...xAxis} />
              <YAxis {...yAxis} />
              <Tooltip />
              {areas.map(({ dataKey, bg }) => (
                <Area
                  key={dataKey}
                  type={area.type}
                  fill="currentColor"
                  stroke="currentColor"
                  fillOpacity={0.3}
                  className={colors[bg]}
                  dataKey={dataKey}
                />
              ))}
            </AreaRechart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};
