import { Link, useParams } from "react-router-dom";
import { Badge, EmptyPlaceholder, Skeleton } from "../../../../../components";
import { storeActionRoutes, useGetStoreByProductId } from "../../store";

export const StoreInformation = () => {
  const { productId } = useParams();
  const {
    data: store,
    isLoading,
    isError,
    error,
  } = useGetStoreByProductId(productId);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full max-w-sm gap-x-2">
          <Skeleton className="h-14 w-14 shrink-0" />
          <div className="grow space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full " />
          </div>
        </div>
      ) : isError ? (
        <EmptyPlaceholder
          title={error?.name ?? "Error"}
          description={error?.message ?? "Uh oh! Something went wrong."}
        />
      ) : (
        <Link
          to={storeActionRoutes.details(store.slug)}
          className="flex w-full gap-x-2"
        >
          <div className="h-14 w-14 shrink-0 space-y-2 overflow-hidden rounded-md border border-black/10">
            <img
              src="https://http2.mlstatic.com/storage/official-stores-images/electronicabymercadolibre/big_logo20200107162513.jpg"
              alt={store.name}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="grow">
            <p className="line-clamp-1 text-sm">{store.name}</p>
            {store.official && <Badge variant="outline">Official</Badge>}
          </div>
        </Link>
      )}
    </>
  );
};
