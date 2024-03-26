import { Link } from "react-router-dom";
import { Skeleton } from "@/components";
import { storeActionRoutes } from "../features/store";

export const StoreCard = ({ store }) => {
  return (
    <Link
      to={storeActionRoutes.details(store)}
      className="block overflow-hidden rounded-md border"
    >
      <img
        className="h-32 w-full object-contain"
        src="https://http2.mlstatic.com/storage/official-stores-images/adidasfitness/logo201903220233.jpg"
        alt={`Profile Store ${store.name}`}
      />
      <div className="p-2 text-center">
        <p className="line-clamp-2 text-sm">{store.name}</p>
      </div>
    </Link>
  );
};

StoreCard.Skeleton = function StoreItemSkeleton() {
  return (
    <div className="overflow-hidden rounded-md border">
      <Skeleton className="h-28 w-full rounded-none" />

      <div className="space-y-1 p-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};
