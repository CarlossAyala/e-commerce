import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/shared/hooks";
import { EmptyState } from "@/shared/components";
import { cn } from "@/shared/utils";
import { Card, buttonVariants } from "@/shared/components";
import { AddressItem } from "../components/address-item";
import { addressActionRoutes } from "../utils";
import { useGetAddresses } from "../queries";

export const Addresses = () => {
  useDocumentTitle("Addresses");

  const { data: addresses, isLoading, isError, error } = useGetAddresses();

  return (
    <div className="max-w-2xl space-y-4">
      <section className="flex justify-between gap-x-4">
        <div className="grow">
          <h3 className="text-lg font-medium">Addresses</h3>
          <p className="text-sm text-muted-foreground">Manage your addresses</p>
        </div>
        <Link
          to={addressActionRoutes.new}
          className={cn(buttonVariants(), "shrink-0")}
        >
          New
        </Link>
      </section>

      <section>
        {isLoading ? (
          <Card className="divide divide-y">
            <AddressItem.Skeleton />
            <AddressItem.Skeleton />
            <AddressItem.Skeleton />
          </Card>
        ) : isError ? (
          <EmptyState title="Error" description={error.message} />
        ) : !addresses.length ? (
          <EmptyState
            title="No addresses"
            description="You don't have any address yet."
          />
        ) : (
          <Card className="divide divide-y">
            {addresses.map((address) => (
              <AddressItem key={address.id} address={address} />
            ))}
          </Card>
        )}
      </section>
    </div>
  );
};
