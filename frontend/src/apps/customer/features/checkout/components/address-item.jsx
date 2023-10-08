import { Skeleton } from "../../../../../components";

export const AddressItem = ({ address }) => {
  return (
    <div>
      <p className="line-clamp-1 text-base font-semibold leading-tight">
        {address.street}
      </p>
      <p className="line-clamp-1 text-sm font-normal leading-tight">
        {`${address.province} (${address.zipCode})`}, {address.city}
      </p>
      <p className="line-clamp-1 text-sm font-normal leading-tight text-muted-foreground">
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
