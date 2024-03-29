import { Link } from "react-router-dom";
import { EmptyState } from "@/shared/components";
import { Skeleton } from "@/components";
import { storeActionRoutes, useGetStoreByProductId } from "../../store";

export const Store = ({ productId }) => {
  const { data, isLoading, isError, error } = useGetStoreByProductId(productId);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Store</p>

      {isLoading ? (
        <div className="flex gap-2">
          <Skeleton className="size-12 shrink-0" />
          <div className="grow space-y-2">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : (
        <Link to={storeActionRoutes.details(data)} className="flex gap-2">
          <div className="size-12 shrink-0 overflow-hidden rounded-md border border-border/40">
            <img
              src="https://http2.mlstatic.com/D_NQ_NP_950925-MLA74959243323_032024-G.jpg"
              alt="Profile"
              className="size-full object-contain object-center"
            />
          </div>
          <div className="grow">
            <h4 className="truncate font-medium">{data.name}</h4>
            {data.official && (
              <p className="text-sm text-muted-foreground">Official Store</p>
            )}
          </div>
        </Link>
      )}
    </div>
  );
};
