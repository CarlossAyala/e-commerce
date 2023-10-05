import { Skeleton } from "../../../../../components";

export const AddressItem = ({ address }) => {
  return (
    <div className="space-y-1">
      <p className="line-clamp-1 text-sm font-medium leading-tight">
        {address.street}
      </p>
      <p className="line-clamp-1 text-sm leading-tight text-muted-foreground">
        {`${address.province} (${address.zipCode})`}, {address.city}
      </p>
      <p className="line-clamp-1 text-sm leading-tight text-muted-foreground">
        {address.name} - {address.phone}
      </p>
    </div>
  );
};

AddressItem.Skeleton = function AddressItemSkeleton() {
  return (
    <div className="space-y-1 p-4">
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-5 w-3/4" />
    </div>
  );
};
