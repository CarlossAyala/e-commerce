import { Skeleton } from "./ui/skeleton";

export const StatComponent = ({
  title,
  description,
  value,
  isError,
  isLoading,
}) => {
  return (
    <div className="overflow-hidden rounded-md border p-4">
      <p className="mb-0 text-sm font-medium text-muted-foreground">{title}</p>
      {isLoading ? (
        <Skeleton className="h-8 w-full" />
      ) : isError ? (
        <p className="text-2xl font-medium tabular-nums">Error</p>
      ) : (
        <p className="text-2xl font-medium tabular-nums">{value}</p>
      )}
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
