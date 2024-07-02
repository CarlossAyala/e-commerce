import { StoreCard } from "@/apps/ecommerce/components";
import { Skeleton } from "@/shared/components";

export const StoresGroup = ({ group }) => {
  return (
    <div className="space-y-2">
      <p className="text-2xl font-semibold">{group.key}</p>
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
        {group.group.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};

StoresGroup.Skeleton = function StoresGroupSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-6 w-10" />
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
        <StoreCard.Skeleton />
        <StoreCard.Skeleton />
        <StoreCard.Skeleton />
      </div>
    </div>
  );
};
