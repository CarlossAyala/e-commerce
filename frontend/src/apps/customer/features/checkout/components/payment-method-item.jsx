import { Skeleton } from "../../../../../components";

export const PaymentMethodItem = ({ card }) => {
  return (
    <div className="">
      <p className="line-clamp-1 text-base font-semibold capitalize leading-tight">
        {card.card.brand}
      </p>
      <p className="line-clamp-1 text-base font-normal capitalize leading-tight">
        {card.billing_details.name}
      </p>
      <p className="line-clamp-1 text-sm font-normal leading-tight"></p>
      <p className="line-clamp-1 text-sm font-normal leading-tight text-muted-foreground">
        Finished at {card.card.last4} - Expires at{" "}
        {`${card.card.exp_month}/${card.card.exp_year}`}
      </p>
    </div>
  );
};

PaymentMethodItem.Skeleton = function PaymentMethodItemSkeleton() {
  return (
    <div className="space-y-1 p-4">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-5 w-3/4" />
    </div>
  );
};
