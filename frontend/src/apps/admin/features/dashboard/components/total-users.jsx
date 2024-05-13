import { UserGroupIcon } from "@heroicons/react/24/outline";
import { EmptyState } from "@/shared/components";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/components";
import { useGetUsersCount } from "../../users";

export const TotalUsers = () => {
  const { data: count, isLoading, isError, error } = useGetUsersCount();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
        <UserGroupIcon className="size-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-full" />
        ) : isError ? (
          <EmptyState
            title="Something went wrong!"
            description={error.message}
          />
        ) : (
          <p className="text-2xl font-bold">{count}</p>
        )}
      </CardContent>
    </Card>
  );
};
