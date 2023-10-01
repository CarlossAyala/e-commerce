import { Link } from "react-router-dom";
import { Badge, Skeleton } from "../../../../../../components";
import { storeActionRoutes } from "../../../store";

export const StoreInformation = ({ store }) => {
  return (
    <Link
      to={storeActionRoutes.detail(store.name)}
      className="flex w-full gap-x-2"
    >
      <div className="shrink-0 space-y-2">
        <div className="h-14 w-14 overflow-hidden rounded-md border border-black/10 shadow">
          <img
            src="https://http2.mlstatic.com/storage/official-stores-images/electronicabymercadolibre/big_logo20200107162513.jpg"
            alt={store.name}
            className="h-full w-full object-contain"
          />
        </div>
        {!store.official && <Badge variant="outline">Official</Badge>}
      </div>
      <div className="grow space-y-0.5">
        <p className="line-clamp-1 text-base font-medium leading-tight">
          {store.name}
        </p>
        <p className="line-clamp-2 text-sm leading-tight text-muted-foreground">
          {store.description}
        </p>
      </div>
    </Link>
  );
};

StoreInformation.Skeleton = function StoreInformationSkeleton() {
  return (
    <div className="flex w-full max-w-sm gap-x-2">
      <Skeleton className="h-14 w-14 shrink-0" />
      <div className="grow space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full " />
        <Skeleton className="h-4 w-full " />
      </div>
    </div>
  );
};

StoreInformation.Error = function StoreInformationError() {
  return (
    <div>
      <p className="text-base leading-tight text-muted-foreground">
        An error occurred while fetching the store
      </p>
    </div>
  );
};
