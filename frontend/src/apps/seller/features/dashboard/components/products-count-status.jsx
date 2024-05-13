import { BoltIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/components";
import { useGetProductCountStatus } from "../../products";

export const ProductsCountStatus = () => {
  const { data: count, isLoading, isError, error } = useGetProductCountStatus();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Active / Inactive Products
        </CardTitle>
        <BoltIcon className="size-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-full" />
        ) : isError ? (
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {error.message}
          </p>
        ) : (
          <p className="text-2xl font-bold">
            {count.active} / {count.inactive}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
