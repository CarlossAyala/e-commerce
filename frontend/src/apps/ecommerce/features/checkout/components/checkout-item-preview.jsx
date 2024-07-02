import { ProductCardRow } from "@/apps/ecommerce/components";
import { Formatter } from "@/shared/utils";
import { Skeleton } from "@/shared/components";

export const CheckoutItemPreview = ({ item }) => {
  const subTotal = item.quantity * +item.product.price;
  return (
    <div className="space-y-2 p-4">
      <ProductCardRow product={item.product} />
      <div className="flex justify-between text-base font-medium">
        <p>x {item.quantity}</p>
        <p>{Formatter.currency(subTotal)}</p>
      </div>
    </div>
  );
};

CheckoutItemPreview.Skeleton = function CheckoutItemPreviewSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <ProductCardRow.Skeleton />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
