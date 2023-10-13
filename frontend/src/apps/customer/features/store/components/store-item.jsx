import { Link } from "react-router-dom";
import { storeActionRoutes } from "../utils";
import { Skeleton } from "../../../../../components";

export const StoreItem = ({ store }) => {
  return (
    <Link
      to={storeActionRoutes.detail(store.slug)}
      className="block overflow-hidden rounded-md border shadow"
    >
      <img
        className="h-28 w-full object-contain"
        src="https://http2.mlstatic.com/storage/official-stores-images/adidasfitness/logo201903220233.jpg"
        alt={`Profile Store ${store.name}`}
      />
      <div className="p-4 text-center">
        <p className="text-xs font-light leading-tight text-muted-foreground">
          {store.name}
        </p>
      </div>
    </Link>
  );
};

StoreItem.Skeleton = function StoreItemSkeleton() {
  return (
    <div className="overflow-hidden rounded-md border shadow">
      <Skeleton className="h-28 w-full rounded-none" />

      <div className="space-y-1 p-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};
