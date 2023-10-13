import { Skeleton } from "../../../../../components";
import { StoreItem } from "./store-item";

export const StoresGroup = ({ group }) => {
  return (
    <div className="space-y-2">
      <p className="text-2xl font-semibold tabular-nums leading-tight">
        {group.key}
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
        {group.group.map((store) => (
          <StoreItem key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};

StoresGroup.Skeleton = function StoresGroupSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-6 w-10" />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
        <StoreItem.Skeleton />
        <StoreItem.Skeleton />
        <StoreItem.Skeleton />
      </div>
    </div>
  );
};
