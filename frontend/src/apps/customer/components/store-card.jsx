import { Link } from "react-router-dom";
import { storeActionRoutes } from "../features/store";
import { Skeleton } from "../../../components";

export const StoreCard = ({ store }) => {
  return (
    <Link
      to={storeActionRoutes.detail(store.slug)}
      className="block overflow-hidden rounded-md border shadow"
    >
      <img
        className="h-32 w-full object-contain"
        src="https://http2.mlstatic.com/storage/official-stores-images/adidasfitness/logo201903220233.jpg"
        alt={`Profile Store ${store.name}`}
      />
      <div className="px-4 py-3 text-center">
        <p className="line-clamp-2 text-xs leading-tight">{store.name}</p>
      </div>
    </Link>
  );
};

StoreCard.Skeleton = function StoreItemSkeleton() {
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
