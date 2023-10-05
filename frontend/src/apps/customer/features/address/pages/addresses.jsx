import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  EmptyPlaceholder,
  MainContent,
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

  const hasContent = isSuccess && addresses?.length > 0;
  const isEmpty = isSuccess && addresses?.length === 0;

  return (
    <MainContent className="max-w-3xl space-y-4">
      <section className="mt-3 justify-between sm:flex">
        <div className="scroll-m-20">
          <h1 className="text-3xl font-semibold tracking-tight">Addresses</h1>
          <p className="mt-1 leading-tight text-muted-foreground">
            Manage your addresses
          </p>
        </div>
        <div className="mt-3 text-end sm:mt-1">
          <Button
            type="button"
            onClick={() => navigate(addressActionRoutes.new)}
          >
            New
          </Button>
        </div>
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
    </MainContent>
  );
};

export default Addresses;
