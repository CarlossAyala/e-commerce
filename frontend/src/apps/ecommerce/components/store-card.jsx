import { Link } from "react-router-dom";
import placeholderImage from "@/assets/images/placeholder-image.jpg";
import { Skeleton } from "@/shared/components";
import { storeActionRoutes } from "../features/stores";

export const StoreCard = ({ store }) => {
  const image = store.url ?? placeholderImage;

  return (
    <Link to={storeActionRoutes.details(store)}>
      <article className="space-y-2">
        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-full border">
          <img
            src={image}
            alt="Store Profile"
            className="size-full object-cover object-center"
          />
        </div>
        <div>
          <p className="line-clamp-1 text-center text-sm">{store.name}</p>
        </div>
      </article>
    </Link>
  );
};

StoreCard.Skeleton = function StoreItemSkeleton() {
  return (
    <article className="space-y-2">
      <Skeleton className="aspect-h-1 aspect-w-1 rounded-full border" />
      <Skeleton className="h-4 w-full" />
    </article>
  );
};
