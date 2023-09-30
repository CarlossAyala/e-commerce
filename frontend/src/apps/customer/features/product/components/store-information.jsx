import { Link } from "react-router-dom";
import { Badge, Skeleton } from "../../../../../components";

export const StoreInformation = ({ store }) => {
  return (
    <Link className="flex w-full gap-x-2">
      <div className="shrink-0 space-y-2 text-center">
        <div className="h-16 w-16  overflow-hidden rounded-md border border-black/10 shadow">
          <img
            src="https://http2.mlstatic.com/storage/official-stores-images/electronicabymercadolibre/big_logo20200107162513.jpg"
            alt={store.name}
            className="h-full w-full object-contain"
          />
        </div>
        {store.official && <Badge variant="outline">Official</Badge>}
      </div>
      <div className="grow space-y-1.5">
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
      <Skeleton className="h-16 w-16 shrink-0" />
      <div className="grow space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full " />
        <Skeleton className="h-4 w-full " />
      </div>
    </div>
  );
};

StoreInformation.Error = function StoreInformationError(error) {
  return (
    <div className="max-w-sm rounded-md border border-dashed px-2 py-4 text-center">
      <p className="text-base leading-tight text-muted-foreground">
        {error?.message ?? "An error occurred while fetching the store"}
      </p>
    </div>
  );
};
