import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Formatter } from "@/shared/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/shared/components";
import { useGetStoreEarnings } from "../../store";

export const TotalRevenue = () => {
  const { data: earnings, isLoading, isError, error } = useGetStoreEarnings();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <CurrencyDollarIcon className="size-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-full" />
        ) : isError ? (
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {error.message}
          </p>
        ) : (
          <p className="text-2xl font-bold">{Formatter.currency(earnings)}</p>
        )}
      </CardContent>
    </Card>
  );
};
