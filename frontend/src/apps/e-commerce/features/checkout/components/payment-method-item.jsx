import { Skeleton } from "@/components";

export const PaymentMethodItem = ({ paymentMethod }) => {
  return (
    <div>
      <p className="line-clamp-1 text-base font-semibold capitalize leading-tight">
        {paymentMethod.card.brand}
      </p>
      <p className="line-clamp-1 text-base font-normal capitalize leading-tight">
        {paymentMethod.billing_details.name}
      </p>
      <p className="line-clamp-1 text-sm font-normal leading-tight"></p>
      <p className="line-clamp-1 text-sm font-normal leading-tight text-muted-foreground">
        Finished at {paymentMethod.card.last4} - Expires at{" "}
        {`${paymentMethod.card.exp_month}/${paymentMethod.card.exp_year}`}
      </p>
    </div>
  );
};

PaymentMethodItem.Skeleton = function PaymentMethodItemSkeleton() {
  return (
    <div className="space-y-1 p-4">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
};
