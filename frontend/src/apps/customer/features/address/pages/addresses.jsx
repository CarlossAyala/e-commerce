import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  EmptyPlaceholder,
} from "../../../../../components";
import { useGetAddresses } from "../queries";
import { AddressItem } from "../components/addresses/address-item";
import {
  ArchiveBoxXMarkIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/outline";
import { addressActionRoutes } from "../utils";

const Addresses = () => {
  const navigate = useNavigate();
  const { data: addresses, isLoading, isError, isSuccess } = useGetAddresses();

  const handleNewAddress = () => {
    navigate(addressActionRoutes.new);
  };

  const hasContent = isSuccess && addresses?.length > 0;
  const isEmpty = isSuccess && addresses?.length === 0;

  return (
    <div className="space-y-4">
      <section className="flex justify-between gap-x-4">
        <div className="grow">
          <h3 className="text-lg font-medium">Addresses</h3>
          <p className="text-sm text-muted-foreground">Manage your addresses</p>
        </div>
        <Button className="shrink-0" type="button" onClick={handleNewAddress}>
          New
        </Button>
      </section>

      <section>
        {isLoading && (
          <Card>
            <CardContent className="divide-y divide-black/10 p-0">
              <AddressItem.Skeleton />
              <AddressItem.Skeleton />
              <AddressItem.Skeleton />
              <AddressItem.Skeleton />
              <AddressItem.Skeleton />
              <AddressItem.Skeleton />
            </CardContent>
          </Card>
        )}
        {isError && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
            <EmptyPlaceholder.Title>
              Error fetching addresses
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              An error occurred while fetching addresses. Please try again
              later.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
        {isEmpty && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={ArchiveBoxXMarkIcon} />
            <EmptyPlaceholder.Title>No addresses found</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any addresses yet. Start creating one.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
        {hasContent && (
          <Card>
            <CardContent className="divide-y divide-black/10 p-0">
              {addresses.map((address) => (
                <AddressItem key={address.id} address={address} />
              ))}
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
};

export default Addresses;
