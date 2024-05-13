import { Link } from "react-router-dom";
import placeholder from "@/assets/images/placeholder-image.jpg";
import { EmptyState } from "@/shared/components";
import { Skeleton } from "@/components";
import { storeActionRoutes, useGetStoreByProductId } from "../../stores";

export const Store = ({ productId }) => {
  const { data, isLoading, isError, error } = useGetStoreByProductId(productId);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Store</p>

      {isLoading ? (
        <div className="flex gap-2">
          <Skeleton className="size-12 shrink-0" />
          <div className="grow space-y-2">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : (
        <Link
          to={storeActionRoutes.details(data)}
          className="flex items-center gap-2"
        >
          <div className="size-12 shrink-0 overflow-hidden rounded-md border">
            <img
              src={data.url ?? placeholder}
              alt="Profile"
              className="size-full object-contain object-center"
            />
          </div>
          <div className="grow">
            <h4 className="line-clamp-1 font-medium">{data.name}</h4>
            <p className="line-clamp-1 text-sm text-muted-foreground">
              {data.description}
            </p>
          </div>
        </Link>
      )}
    </div>
  );
};
