import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const StatCardSkeleton = ({ title, icon: Icon }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-neutral-500" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-44" />
      </CardContent>
    </Card>
  );
};

export default StatCardSkeleton;
