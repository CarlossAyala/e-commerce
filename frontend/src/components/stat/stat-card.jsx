import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import StatCardSkeleton from "./stat-card-skeleton";

const StatCard = ({ title, content, icon: Icon, isLoading, isSuccess }) => {
  if (isLoading) {
    return <StatCardSkeleton title={title} icon={Icon} />;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-neutral-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isSuccess ? content : "Error"}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
