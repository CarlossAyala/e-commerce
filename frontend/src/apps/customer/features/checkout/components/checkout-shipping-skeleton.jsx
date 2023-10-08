import { Card, MainContent, Skeleton } from "../../../../../components";
import { AddressItem } from "./address-item";
import { CartSummary } from "./cart-summary";

export const CheckoutShippingSkeleton = () => {
  return (
    <MainContent className="flex max-w-5xl flex-col">
      <section className="mt-2 w-full max-w-lg space-y-2">
        <Skeleton className="h-9 w-1/2 scroll-m-20" />
        <Skeleton className="h-5 w-full" />
      </section>

      <section className="mt-4 h-full">
        <Skeleton className="h-5 w-1/2" />

        <div className="mt-2 flex h-full gap-4">
          <div className="grow space-y-4">
            <Card>
              <div className="divide-y divide-black/10">
                <AddressItem.Skeleton />
                <AddressItem.Skeleton />
                <AddressItem.Skeleton />
                <AddressItem.Skeleton />
              </div>
            </Card>
            <div className="sticky bottom-0 mt-auto rounded-b-md bg-white md:hidden">
              <Card className="sticky top-4">
                <CartSummary.Skeleton />
              </Card>
            </div>
          </div>
          <div className="relative hidden w-full max-w-sm shrink-0 md:block">
            <Card>
              <CartSummary.Skeleton />
            </Card>
          </div>
        </div>
      </section>
    </MainContent>
  );
};
